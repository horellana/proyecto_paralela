import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RecuperarContraseAPage } from '../recuperar-contrase-a/recuperar-contrase-a';
import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';
import { HomeDocentePage } from '../home-docente/home-docente';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: any;

    constructor(public navCtrl: NavController,
                public formBuilder: FormBuilder,
                public httpClient: HttpClient,
                public alertCtrl: AlertController) {

        this.loginForm = this.formBuilder.group({
            rut: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login(params) {
        if (this.loginForm.status === "INVALID") {
            this.missingDataAlert().present();
            return;
        }

        let url =  'https://api.sebastian.cl/academia/api/v1/authentication/authenticate';
        let data = {'rut': this.loginForm.value.rut,
                    'password': this.loginForm.value.password};

        this.httpClient
            .post(url, data)
            .subscribe(
                result => {
                    let nextPage = result.role === "Docente"
                        ? HomeDocentePage
                        : HomeEstudiantePage;

                    this.navCtrl.setRoot(nextPage, result);
                },
                error => {
                    this.invalidDataAlert().present();
                });
    }

    forgotPassword() {
        console.log("Recuperar contraseña");
        this.navCtrl.push(RecuperarContraseAPage);
    }

    missingDataAlert() {
        return this.alertCtrl.create({title: 'Error',
                                      subTitle: 'Por favor ingresa todos los datos'});
    }

    invalidDataAlert() {
        return this.alertCtrl.create({title: 'Error',
                                      subTitle: 'Rut o contraseña incorrecto'});

    }
}
