import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpHelper {

  getParams = (params: any) => {
    if (!params) return;
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((json: any, key: string) => {
        json[key] = params[key];
        return json;
      }, []);
  }
}
