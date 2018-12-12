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
import { Indent_API } from 'app/services/apiurls/indent.api';
import { RAW_MATERIAL } from 'app/services/apiurls/rawMaterial.api';
import { STOCK_UNIT } from 'app/services/apiurls/unitOfMeasurment.api';
import { PRODUCT_LIST } from 'app/services/apiurls/product.api';



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
    return this._http.post(config.apiUrl + Indent_API.ADD.replace(':rawMaterialId', model.rawMaterial).replace(':categoryId', model.category).replace(':unitId', model.unit).replace(':qty', model.quantity).replace(':priority', model.priority).replace(':hsn', model.hsnCode).replace(':gst', model.gst).replace(':CreateDate', model.date), '').pipe(map((res) => {
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

  public AddRawMaterial(ItemName): any {
    return this._http.post(config.apiUrl + RAW_MATERIAL.ADD.replace(':name', ItemName), '').pipe(map((res) => {
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
    return this._http.post(config.apiUrl + STOCK_UNIT.ADD, unitName).pipe(map((res) => {
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
    return this._http.post(config.apiUrl + PRODUCT_LIST.ADD, categoryName).pipe(map((res) => {
      const data: BaseResponse<any, any> = res;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }


}
