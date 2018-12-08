import { catchError, map } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
// import { Configuration, URLS } from '../app.constants';
import { Router } from '@angular/router';
import { HttpWrapperService } from './httpWrapper.service';
import { LOGIN_API } from './apiurls/login.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from "environments/environment";
import { BaseResponse } from "app/models/api-models/BaseResponse";
import { ErrorHandler } from "app/services/catchManager/catchmanger";
import { LoginWithPassword } from "app/models/interfaces/login.interface";
import { Indent_API } from "app/services/apiurls/indent.api";

@Injectable()
export class IndentService {

  constructor(private errorHandler: ErrorHandler,
            public _httpClient: HttpClient,
            public _http: HttpWrapperService,
            public _router: Router,
            ) {

  }

  public GetIndent(): Observable<BaseResponse<any, any>> {
    return this._http.get(config.apiUrl + Indent_API.GET).pipe(map((res) => {
      let data: BaseResponse<any, any> = res;
      debugger;
      // data.request = model;
      // console.log(data);
      return data;
    }), catchError((e) => this.errorHandler.HandleCatch<any, any>(e, '')));
  }

}
