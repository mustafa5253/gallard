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

import { IndentListComponent } from 'app/indent-purchases/indent/indent-list/indent-list.component';
import { IndentService } from 'app/services/indent.service';
import { AddIndentComponent } from 'app/indent-purchases/indent/create-indent/add-indent.component';
import { IndentPurchaseComponent } from 'app/indent-purchases/indent-purchase.component';
import { GeneratePurchaseOrder } from 'app/indent-purchases/generate-order-modal/generate-order.component';
import { IndentComponent } from 'app/indent-purchases/indent/indent.component';
import { GeneratedIndentList } from 'app/indent-purchases/purchase-order/purchase-order-list.component';
import { GoodsReceiptNote } from 'app/indent-purchases/goods-note/goods-note.component';
import { MaterialListComponent } from 'app/indent-purchases/materials-operation/materials-operation.component';
import { UnitListComponent } from 'app/indent-purchases/units-operation/units-operation.component';
import { CategoryListComponent } from 'app/indent-purchases/category-operation/category-operation.component';
import { FuseSidebarModule } from '@fuse/components/sidebar/sidebar.module';
import { InventoryComponent } from 'app/indent-purchases/inventory/inventory.component';
import { IssueStockComponent } from 'app/indent-purchases/inventory/issue-stock/issue-stock.component';
import { IssueStockListComponent } from 'app/indent-purchases/inventory/issue-stock-list/issue-stock-list.component';
import { StockListComponent } from 'app/indent-purchases/inventory/stock-list/stock-list.component';
import { IndentHistoryComponent } from 'app/indent-purchases/indent/indent-history-modal/indent-history.component';



const routes: Routes = [
    {
        path     : '',
        component: IndentPurchaseComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'create'},
          {path: 'create', component: IndentComponent},
          {path: 'generated', component: GeneratedIndentList},
          {path: 'grn', component: GoodsReceiptNote},
          {path: 'materials', component: MaterialListComponent},
          {path: 'units', component: UnitListComponent},
          {path: 'category', component: CategoryListComponent},
          {path: 'issue-stock', component: InventoryComponent},
          {path: 'stock-list', component: StockListComponent},
        ]
        // resolve  : {
        //     data: EcommerceProductsService
        // }
    }
];

@NgModule({
    declarations: [
        IndentPurchaseComponent,
        IndentListComponent,
        AddIndentComponent,
        GeneratePurchaseOrder,
        GeneratedIndentList,
        IndentComponent,
        GoodsReceiptNote,
        MaterialListComponent,
        UnitListComponent,
        CategoryListComponent,
        IssueStockComponent,
        IssueStockListComponent,
        InventoryComponent,
        StockListComponent,
        IndentHistoryComponent
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
        FuseWidgetModule,
        FuseSidebarModule
    ],
    providers   : [
        IndentService,
    ],
    exports: [
        GeneratePurchaseOrder
    ],
    entryComponents: [
        GeneratePurchaseOrder,
        IndentHistoryComponent,
        AddIndentComponent,
        IssueStockComponent
    ]
})
export class IndentPurchaseModule
{
}
