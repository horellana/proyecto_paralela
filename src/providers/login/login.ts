import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
    user : any = {
        rut: null,
        role: null,
        apiKey: null
    };

    loginUrl = 'https://api.sebastian.cl/academia/api/v1/authentication/authenticate';

    constructor(public httpClient: HttpClient) {
    }

    isLogged() {
        return this.user.role != null;
    }

    tryLogin(rut: string, password: string) {
        let data = { rut: rut, password: password };

        return this.httpClient
            .post(this.loginUrl, data)
            .pipe(tap((data : any) => {
                this.user.rut = data.rut;
                this.user.role = data.role;
                this.user.apiKey = data.apiKey;

                console.log("====== From login provider ======");
                console.log(this.user);
                console.log("====== Login provider done ====== ")
            }));
    }
}
