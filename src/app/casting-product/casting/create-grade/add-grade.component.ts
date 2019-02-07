import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { IndentService } from "app/services/indent.service";
import { ToasterService } from "app/services/toaster.service";
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';



@Component({
    selector     : 'add-grade',
    templateUrl  : './add-grade.component.html',
    styleUrls    : ['./add-grade.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AddGradeComponent implements OnInit, OnDestroy, OnChanges {

    @Output('indentCreated') public indentCreated: EventEmitter<boolean> = new EventEmitter(false);
    public pageType: string;
    public indentForm: FormGroup;
    public materialList = [];
    public categoryList = [];
    public unitList = [];
    public materialFilter: Observable<any[]> = of([]);
    public categoryFilter: Observable<any[]> = of([]);
    public unitFilter: Observable<any[]> = of([]);
    public noMaterialFound: boolean = false;
    public noUnitFound: boolean = false;
    public moment = moment;
    public isUpdate = false;
    public addMaterialForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        public dialogRef: MatDialogRef<AddGradeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _indentService: IndentService,
        private _toastr: ToasterService,
        private _fuseSidebarService: FuseSidebarService
    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    public ngOnInit(): void {
        this.getRawMaterial();
      
        this.indentForm = this.createIndentForm();
       

       

        

    }

    public createIndentForm(): FormGroup {
        return this._formBuilder.group({
           
            RawMaterialId: ['', [Validators.required]],
            CategoryId: ['', [Validators.required]],
           
        });
    }

   

    
    public getRawMaterial() {
        this._indentService.GetRawMaterial().subscribe((a: any) => {
            if (a) {
                this.materialList = a.Body;
                this.materialFilter = of(a.Body);
            }
        });
    }

    

    public  addRawMaterial() {
        let obj = this.addMaterialForm.value;
        this._indentService.AddRawMaterial(obj).subscribe((a: any) => {
           if (a && a.Status && a.Status.toLowerCase() === 'success') {
            this.materialList.push(a.Body);
            this.materialFilter = of(this.materialList);
            this._toastr.successToast('Material added succesfully');
            this.addMaterialForm.reset();
           
           } else {
              this._toastr.errorToast(a.Status);
           }
        });

    }

    
   

    
    
  
    public ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * ngOnChanges
     */
    public ngOnChanges(s) {
        console.log(s);
    }

    


    


}

