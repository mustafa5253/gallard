import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { IndentService } from '../../services/indent.service';
import { ToasterService } from '../../services/toaster.service';
import * as moment from 'moment';
import * as _ from 'lodash';


export const materialList = [
    { ItemName: 'Fe SI Mg', RawMaterialId: 1},
    { ItemName: 'Fe Mg', RawMaterialId: 2},
    { ItemName: 'Sleeve 4X6', RawMaterialId: 3},
    { ItemName: 'Sleeve 4X8', RawMaterialId: 4},
];

export const categoryList = [
    { CategoryName: 'Production', CategoryId: 1},
    { CategoryName: 'Consumption', CategoryId: 2},
    { CategoryName: 'Maintainance', CategoryId: 3},
    { CategoryName: 'Capital Expenditure', CategoryId: 4},
];

export const unitList = [
    {UOM: 'piece', UOMID: 'pcs'},
    {UOM: 'number', UOMID: 'number'},
    {UOM: 'kilogram', UOMID: 'kgs'},
    {UOM: 'litre', UOMID: 'ltr'},

];

export const gstList = [0, 5, 12, 18, 28];
export const priority = ['normal', 'urgent'];

@Component({
    selector     : 'add-indent',
    templateUrl  : './add-indent.component.html',
    styleUrls    : ['./add-indent.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AddIndentComponent implements OnInit
{
    pageType: string;
    indentForm: FormGroup;
    materialList = [];
    categoryList = [];
    unitList = [];
    gstList = gstList;
    priority = priority;
    materialFilter: Observable<any[]>;
    categoryFilter: Observable<any[]>;
    unitFilter: Observable<any[]>;
    public noMaterialFound: boolean = false;
    public noUnitFound: boolean = false;
    public moment = moment;


    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _formBuilder: FormBuilder,
        // private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _indentService: IndentService,
        private _toastr: ToasterService        
    )
    {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getRawMaterial();
        this.getCategory();
        this.getStockUnit();
        this.indentForm = this.createProductForm();



        this.materialFilter = this.indentForm.get('rawMaterial').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, 'material'))
        );

        this.categoryFilter = this.indentForm.get('category').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, 'category'))
        );

        this.unitFilter = this.indentForm.get('unit').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, 'unit'))
        );

    }

    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            date: [''],
            rawMaterial: ['', [Validators.required]],
            category: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
            stkid: [{value: '', disabled: true}],
            unit: ['', [Validators.required]],
            hsnCode: [''],
            gst: [''],
            priority: ['', [Validators.required]]
        });
    }

    addNewIndent(): any {
        const model: any = _.cloneDeep(this.indentForm.value);
        model.rawMaterial = _.find(this.materialList, (o) => { return o.ItemName === model.rawMaterial}).RawMaterialId;

        model.category = _.find(this.categoryList, (o) => { return o.CategoryName === model.category}).CategoryId;

        model.unit = _.find(this.unitList, (o) => { return o.UOM === model.unit}).UOMID;
        model.date = moment(model.date).format('DD/MM/YYYY');

        this._indentService.AddIndent(model).subscribe(a => {
            if (a && a.Status.toLowerCase() === 'success') {
                this._toastr.successToast('Indent added succesfully');                
            } else {
                this._toastr.errorToast(a.Status);
            }
        });
    }

    showToaster() {
        this._matSnackBar.open('Indent added succesfully', '', {
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
    }

    getRawMaterial() {
        this._indentService.GetRawMaterial().subscribe((a: any) => {
            if (a) {
                this.materialList = a.Body;
            }
        });
    }

    getStockUnit() {
        this._indentService.GetStockUnit().subscribe((a: any) => {
            if (a) {
                this.unitList = a.Body;
            }
        });
    }

    getCategory() {
        this._indentService.GetCategory().subscribe((a: any) => {
            if (a) {
                this.categoryList = a.Body;
            }
        });
    }

    addRawMaterial() {
        let val = this.indentForm.get('rawMaterial').value;
        if (!val) {
            return this._toastr.warningToast("Raw Material can't be blank");
        }
        this._indentService.AddRawMaterial(val).subscribe((a: any) => {
           // console.log(a);
           if (a && a.Status.toLowerCase() === 'success') {
               this.materialList.push(a.Body);
               this._toastr.successToast("Material added succesfully");
           } else {
              this._toastr.errorToast(a.Status);
           }
        }); 
    }


    addUnit() {
        let val = this.indentForm.get('unit').value;
        if (!val) {
            return this._toastr.warningToast("Unit can't be blank");
        }
        this._indentService.AddStockUnit(val).subscribe((a: any) => {
           if (a && a.Status.toLowerCase() === 'success') {
               this.unitList.push(a.Body);
               this._toastr.successToast("Stock Unit added succesfully");
           } else {
              this._toastr.errorToast(a.Status);
              this.indentForm.patchValue({unit: ''});
           }
        }); 
    }

    addCategory() {
        let val = this.indentForm.get('category').value;
        if (!val) {
            return this._toastr.warningToast("Category can't be blank");
        }
        this._indentService.AddCategory(val).subscribe((a: any) => {
            if (a && a.Status.toLowerCase() === 'success') {
                this.categoryList.push(a.Body);
               this._toastr.successToast("Category added succesfully");
           } else {
              this._toastr.errorToast(a.Status);
           }
        }); 
    }

    private _filter(value: string, type) {
        const filterValue = value.toLowerCase();
        switch(type) {
            case 'material': {
                            return this.materialList.filter( (option: any) => option.ItemName.toLowerCase().includes(filterValue));
                        }
            case 'category': {
                            return this.categoryList.filter( (option: any) => option.CategoryName.toLowerCase().includes(filterValue));
                        }
            case 'unit': {
                            return this.unitList.filter( (option: any) => 
                            option.UOM.toLowerCase().includes(filterValue));
                        }
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

