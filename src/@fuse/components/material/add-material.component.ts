import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';


import { fuseAnimations } from '@fuse/animations';

import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector     : 'add-indent',
    templateUrl  : './add-indent.component.html',
    styleUrls    : ['./add-indent.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AddMaterialComponent implements OnInit
{
    addMaterialForm: FormGroup;


    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _formBuilder: FormBuilder,
        // private _location: Location,
        private _matSnackBar: MatSnackBar
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
        this.addMaterialForm = this.newMaterialForm();   
    }

    newMaterialForm(): FormGroup
    {
        return this._formBuilder.group({
            ItemName: [''],
        });
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

