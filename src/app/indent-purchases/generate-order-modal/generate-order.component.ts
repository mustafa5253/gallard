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
    public selectedVendor = '';

    @Input() dataSource: any[] = [];
    displayedColumns = ['serial', 'date', 'number', 'name', 'qty', 'unit', 'price', 'total','action'];

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

        this.data.indentList = _.map(this.data.indentList, (o: any) => {
          o.CreateDate = moment(o.CreateDate).format('MM/DD/YYYY');
          o.OrderQuantity = o.Quantity;
           return o;  
        });
        if (this.data.isUpdate) {
          this.createOrderForm.patchValue(this.data.poDetail);
          this.createOrderForm.get('PODate').patchValue(moment());
        }
        
    }

    initCreateOrderForm() {
        return this._formBuilder.group({
            SupplierId: ['', [Validators.required]],
            PONumber: [{value: moment().format('YYYYMMDDHHss'), disabled: true}],
            PODate: [moment(), [Validators.required]],
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
            if (this.data.isUpdate) {
              debugger;
              let selectedVendor: any = _.find(this.vendorList, (o: any) => o.VendorId === this.data.poDetail.SupplierId);
              if (selectedVendor) {
                this.selectedVendor = selectedVendor;
              }            
            }
        }
      });
    }

    onSelectVendor(vendor) {
      this.vendorDetails = vendor;
      this.createOrderForm.controls['SupplierId'].patchValue(vendor.VendorId);
      this.createOrderForm.controls['PinCode'].patchValue(vendor.PinCode);
    }

    generateOrder() {
      this.createOrderForm.get('PONumber').enable(); 
      let requestObj = this.createOrderForm.value;
      this.createOrderForm.get('PONumber').disable();
      requestObj.PoList = this.data.indentList;
      requestObj.PODate = moment(requestObj.PODate).format('MM/DD/YYYY');
      this._indentService.GeneratePurchaseOrder(requestObj).subscribe((a: any) => {
          if (a && a.Status.toLowerCase() === 'success') {
              this._toastr.successToast('Purchase order generated succesfully');  
              this.createOrderForm.reset();              
          } else {
              this._toastr.errorToast(a.Status);
          }
        });
    }

    showVendorDetail() {
      this._fuseSidebarService.getSidebar('vendorDetailsAside').toggleOpen();
    }

    getPriceHistory(id, idx) {
      let selectedIdx = this.data.indentList[idx];
      if(!selectedIdx.Price || !selectedIdx.OrderQuantity) {
        return;
      }
      let selectedIndentPriceQty = this.data.indentList[idx].Price / this.data.indentList[idx].OrderQuantity;
      this._indentService.GetPriceHistory(id).subscribe((a) => {
        if (a && a.Body.length) {
            let quantityPerPrice = [];
            _.forEach(a.Body, (obj: any) => {
              let pricePerQty = obj.Price / obj.Quantity;
              if (selectedIndentPriceQty / 10*100 > pricePerQty / 10*100) {
               return this._toastr.warningToast('Price for material '+ obj.ItemName + ' is more than 10% of the previous order');
              }
            });
        }
      });
    }

    removeIndent(idx) {
      if (this.data.indentList.length > 1) {
        this.data.indentList = this.data.indentList.splice(idx, 1);        
      } else {
        this._toastr.warningToast('Atleast 1 indent required');
      }
    }

    calculateTotal(indent) {
      indent.total = Number(indent.Price) + (Number(indent.Price) * indent.Gst / 100) * indent.Quantity;
    }

  updateOrder() {
    this.createOrderForm.get('PONumber').enable(); 
    let requestObj = this.createOrderForm.value;
    this.createOrderForm.get('PONumber').disable();
    requestObj.PoList = this.data.indentList;
    requestObj.PODate = moment(requestObj.PODate).format('MM/DD/YYYY');
    this._indentService.UpdatePurchaseOrder(requestObj).subscribe((a: any) => {
        if (a && a.Status.toLowerCase() === 'success') {
            this._toastr.successToast('Purchase order updated succesfully');  
            this.createOrderForm.reset();              
        } else {
            this._toastr.errorToast(a.Status);
        }
      });
  }    
}
