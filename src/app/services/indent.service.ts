import { catchError, map } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
// import { Configuration, URLS } from '../app.constants';
import { Router } from '@angular/router';
import { HttpWrapperService } from './httpWrapper.service';
import { LOGIN_API } from './apiurls/login.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'environments/environment';
import { BaseResponse } from 'app/models/api-models/BaseResponse';
import { ErrorHandler } from 'app/services/catchManager/catchmanger';
import { LoginWithPassword } from 'app/models/interfaces/login.interface';
import { Indent_API, Inventory_API } from 'app/services/apiurls/indent.api';
import { RAW_MATERIAL } from 'app/services/apiurls/rawMaterial.api';
import { STOCK_UNIT } from 'app/services/apiurls/unitOfMeasurment.api';
import { PRODUCT_LIST } from 'app/services/apiurls/product.api';
import { GENERAL_API } from 'app/services/apiurls/general.api';
import { VENDOR_API } from 'app/services/apiurls/vendor.api';


@Injectable()
export class IndentService {

  constructor(private errorHandler: ErrorHandler,
            public _httpClient: HttpClient,
            public _http: HttpWrapperService,
            public _router: Router,
            ) {

  }

  public GetIndent(): any {
    return this._http.get(config.apiUrl + Indent_API.GET).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public AddIndent(model): any {
    return this._http.post(config.apiUrl + Indent_API.ADD, model).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public DeleteIndent(indentId): any {
    return this._http.delete(config.apiUrl + Indent_API.DELETE.replace(':indentId', indentId)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetRawMaterial(): any {
    return this._http.get(config.apiUrl + RAW_MATERIAL.GET).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public AddRawMaterial(model): any {
    return this._http.post(config.apiUrl + RAW_MATERIAL.ADD, model).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public DeleteMaterial(id): any {
    return this._http.delete(config.apiUrl + RAW_MATERIAL.DELETE.replace(':id', id)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }


  public GetStockUnit(): any {
    return this._http.get(config.apiUrl + STOCK_UNIT.GET).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public AddStockUnit(unitName): any {
    return this._http.post(config.apiUrl + STOCK_UNIT.ADD.replace(':unit', unitName), '').pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public DeleteStockUnit(id): any {
    return this._http.delete(config.apiUrl + STOCK_UNIT.DELETE.replace(':id', id)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetCategory(): any {
    return this._http.get(config.apiUrl + PRODUCT_LIST.GET).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public AddCategory(categoryName): any {
    return this._http.post(config.apiUrl + PRODUCT_LIST.ADD.replace(":name", categoryName), '').pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }


  public DeleteCategory(id): any {
    return this._http.delete(config.apiUrl + PRODUCT_LIST.DELETE.replace(":id", id)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetState(): any {
    return this._http.get(config.apiUrl + GENERAL_API.GET_STATE).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetCity(stateId): any {
    return this._http.get(config.apiUrl + GENERAL_API.GET_CITY.replace(':stateId', stateId)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetAllVendor(): any {
    return this._http.get(config.apiUrl + VENDOR_API.GET).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GeneratePurchaseOrder(model): any {
    return this._http.post(config.apiUrl + Indent_API.GENERATE_PO, model).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetPurchaseOrders(poNumber, supplierId): any {
    if (!poNumber) {
      poNumber = 0;
    }
    if (!supplierId) {
      supplierId = 0;
    }

    let query = '?PoNumber=' + poNumber + '&SupplierId=' + supplierId;

 

    return this._http.get(config.apiUrl + Indent_API.GET_PO + query).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetOrderByNumber(number): any {
    return this._http.get(config.apiUrl + Indent_API.SEARCH_PO_NUMBER.replace(':number', number)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GenerateGRN(model): any {
    return this._http.post(config.apiUrl + Indent_API.GENERATE_GRN, model).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public IssueStock(model): any {
    return this._http.post(config.apiUrl + Inventory_API.ISSUE_ITEM, model).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetIssuedItemList(): any {
    return this._http.get(config.apiUrl + Inventory_API.GET_ISSUED_ITEM).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }


  public GetStockList(): any {
    return this._http.get(config.apiUrl + Inventory_API.GET_STOCK_LIST).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

  public GetPriceHistory(id): any {
    return this._http.get(config.apiUrl + Indent_API.GET_MATERIAL_HISTORY.replace(':id', id)).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }
}
