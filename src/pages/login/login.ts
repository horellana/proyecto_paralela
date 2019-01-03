import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecuperarContraseAPage } from '../recuperar-contrase-a/recuperar-contrase-a';
import { PrincipalPage } from '../principal/principal';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: FormBuilder;

    constructor(public navCtrl: NavController,
                public formBuilder: FormBuilder,
        this.loginForm = this.formBuilder.group({
            rut: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    login(params) {
        if (this.loginForm.status === "INVALID") {
            this.alertCtrl
                .create({title: 'Error',
                         subTitle: 'Por favor ingresa todos los datos'})
                .present();
            return;
        }
    goToRecuperarContraseA(params){
        if (!params) params = {};
        this.navCtrl.setRoot(RecuperarContraseAPage);
    }

    goToLogin(params){
        if (!params) params = {};
        this.navCtrl.setRoot(LoginPage);
    }

    goToPrincipal(params){
        if (!params) params = {};
        this.navCtrl.setRoot(PrincipalPage);
    }
}
