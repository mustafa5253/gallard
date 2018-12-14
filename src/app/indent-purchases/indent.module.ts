import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,
    MatTableModule, MatTabsModule, MatCheckboxModule, MatMenuModule, MatAutocompleteModule, MatDatepickerModule, MatDialogModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

// import { EcommerceProductsComponent } from 'app/main/apps/e-commerce/products/products.component';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
// import { EcommerceProductComponent } from 'app/main/apps/e-commerce/product/product.component';
// import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
// import { EcommerceOrdersComponent } from 'app/main/apps/e-commerce/orders/orders.component';
// import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
// import { EcommerceOrderComponent } from 'app/main/apps/e-commerce/order/order.component';
// import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';
import { IndentListComponent } from 'app/indent-purchases/indent-list/indent-list.component';
import { IndentService } from 'app/services/indent.service';
import { AddIndentComponent } from 'app/indent-purchases/create-indent/add-indent.component';
import { IndentComponent } from 'app/indent-purchases/indent.component';
import { GeneratePurchaseOrder } from "app/indent-purchases/generate-order-modal/generate-order.component";

const routes: Routes = [
    {
        path     : '',
        component: IndentComponent,
        // resolve  : {
        //     data: EcommerceProductsService
        // }
    }
];

@NgModule({
    declarations: [
        IndentComponent,
        IndentListComponent,
        AddIndentComponent,
        GeneratePurchaseOrder
        // EcommerceProductsComponent,
        // EcommerceProductComponent,
        // EcommerceOrdersComponent,
        // EcommerceOrderComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        NgxChartsModule,
        MatDialogModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        IndentService,
        EcommerceProductsService,
        // EcommerceProductService,
        // EcommerceOrdersService,
        // EcommerceOrderService
    ],
    exports: [
        GeneratePurchaseOrder
    ],
    entryComponents: [
        GeneratePurchaseOrder
    ]
})
export class IndentModule
{
}
