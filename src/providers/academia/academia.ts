import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AcademiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcademiaProvider {
    backendUrl = "https://api.sebastian.cl/academia/api/v1/"

    constructor(public http: HttpClient) {
        console.log('Hello AcademiaProvider Provider');
    }

    setBackendUrl(newUrl) {
        console.log("newUrl = " + newUrl);

        if (newUrl[newUrl.length - 1] != '/') {
            newUrl = newUrl + '/';
        }

        this.backendUrl = newUrl;
    }

    forgotPassword(rut: string) {
        let url = this.backendUrl + `authentication/forgot/${rut}`;
        return this.http.post(url, {});
    }
}
