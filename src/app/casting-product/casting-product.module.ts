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
import { CastingProductComponent } from './casting-product.component';
import { CastingComponent } from './casting/casting.component';
import { CastingListComponent } from './casting/casting-list/casting-list.component';
import { AddCastingComponent } from './casting/create-casting/add-casting.component';
import { GradeListComponent } from './casting/grade-list/grade-list.component';
import { AddGradeComponent } from './casting/create-grade/add-grade.component';



const routes: Routes = [
    {
        path     : '',
        component: CastingProductComponent,
        children: [
         //  {path: '', pathMatch: 'full', redirectTo: 'castingData'},
           {path: 'casting', component: CastingComponent},
          {path: 'grade-list', component: GradeListComponent},
        //   {path: 'grn', component: GoodsReceiptNote},
        //   {path: 'materials', component: MaterialListComponent},
        //   {path: 'units', component: UnitListComponent},
        //   {path: 'category', component: CategoryListComponent},
        //   {path: 'issue-stock', component: InventoryComponent},
        //   {path: 'stock-list', component: StockListComponent},
        ]
        
    }
];

@NgModule({
    declarations: [
        AddGradeComponent,
        GradeListComponent,
        AddCastingComponent,
        CastingListComponent,
        CastingComponent,
        CastingProductComponent,
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
        FuseSidebarModule,
        
    ],
    providers   : [
        IndentService,
    ],
    exports: [
        GeneratePurchaseOrder
    ],
    entryComponents: [
        AddGradeComponent,
        GradeListComponent,
        AddCastingComponent,
        GeneratePurchaseOrder,
        IndentHistoryComponent,
        AddIndentComponent,
        IssueStockComponent
    ]
})
export class CastingProductModule
{
}
