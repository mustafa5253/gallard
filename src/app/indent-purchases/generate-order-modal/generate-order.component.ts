import {Component, Input, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndentService } from '../../services/indent.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'generate-purchase-order',
  styleUrls: ['./generate-order.component.scss'],
  templateUrl: './generate-order.component.html',
  animations   : fuseAnimations,
})
export class GeneratePurchaseOrder implements OnInit {
  	showSupplierDetail = true;
    stateList = [];
    cityList = [];
    vendorList = [];
    vendorFilter = [];
    createOrderForm: FormGroup;
    vendorDetails: any = {};
    public moment = moment;
    isVendorDetailShown;

    @Input() dataSource: any[] = [];
    displayedColumns = ['serial', 'date', 'number', 'name', 'category', 'qty', 'unit', 'price', 'action'];

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
	    @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _indentService: IndentService,
        private _toastr: ToasterService,
        private _fuseSidebarService: FuseSidebarService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();


    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.createOrderForm = this.initCreateOrderForm();
        this.getAllVendor();
        this.getState();

        _.map(this.data.indentList, (o) => {
          o.CreateDate = moment(o.CreateDate).format('MM/DD/YYYY');
          return o.OrderQuantity = o.Quantity;  
        });
    }

    initCreateOrderForm() {
        return this._formBuilder.group({
            SupplierId: ['', [Validators.required]],
            PONumber: [{value: this.GenerateUniqueID(), disabled: true}],
            PODate: ['', [Validators.required]],
            SupplierRef: [''],
            Despatchhrough: [''],
            TermsofDelivery: [''],
            PinCode: [''],
            // IndentKey: ['']
        });
    }

    getState() {
      this._indentService.GetState().subscribe((a: any) => {
        if (a) {
            this.stateList = a.Body;
        }
      });
    }

    getCity(stateId) {
      this._indentService.GetCity(stateId).subscribe((a: any) => {
        if (a) {
            this.cityList = a.Body;
        }
      });
    }


    getAllVendor() {
      this._indentService.GetAllVendor().subscribe((a: any) => {
        if (a) {
            this.vendorList = a.Body;
        }
      });
    }

    onSelectVendor(vendor) {
      this.vendorDetails = vendor;
      this.createOrderForm.controls['SupplierId'].patchValue(vendor.VendorId);
      this.createOrderForm.controls['PinCode'].patchValue(vendor.PinCode);

      console.log(vendor);
    }

    generateOrder() {
      this.createOrderForm.get('PONumber').enable(); 
      const requestObj = this.createOrderForm.value;
      this.createOrderForm.get('PONumber').disable();

      // _.forEach(this.data.indentList, function(o) {
      //     return indentKeys.push(o.IndentId);
      // });

      // if(indentKeys.length) {
      //   requestObj.IndentKey = String(indentKeys);
      // }
      requestObj.PoList = this.data.indentList;
      requestObj.PODate = moment(requestObj.PODate).format('MM/DD/YYYY');
      // requestObj.ID = requestObj.PONumber;

     this._indentService.GeneratePurchaseOrder(requestObj).subscribe((a: any) => {
        if (a && a.Status.toLowerCase() === 'success') {
            this._toastr.successToast('Purchase order generated succesfully');  
            this.createOrderForm.reset();              
        } else {
            this._toastr.errorToast(a.Status);
        }
      });
    }

    GenerateUniqueID() {
      return (Math.random() * (105000 - 784001) + 784001) | 0;
    }


    showVendorDetail() {
      this._fuseSidebarService.getSidebar('vendorDetailsAside').toggleOpen();
    }

    getMaterialHistory(id) {
      this._indentService.GetMaterialHistory(id).subscribe((a) => {
        if (a && a.Body.length) {

        } else {
          this._toastr.errorToast('No history found');
        }
        console.log(a);
      });
    }

    removeIndent(idx) {
      if (idx) {
        this.data.indentList.splice(idx, 1);        
      } else {
        this._toastr.warningToast('Atleast 1 indent required');
      }
    }
}
