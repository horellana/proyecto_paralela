import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RecuperarContraseAPage } from '../recuperar-contrase-a/recuperar-contrase-a';

import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';
import { HomeDocentePage } from '../home-docente/home-docente';
import { MenuPage } from '../menu/menu';

import { FormBuilder, Validators } from '@angular/forms';

import { LoginProvider } from '../../providers/login/login';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: any;

    constructor(public navCtrl: NavController,
                public formBuilder: FormBuilder,
                public alertCtrl: AlertController,
                public loginProvider: LoginProvider) {

        this.loginForm = this.formBuilder.group({
            rut: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.onLogin = this.onLogin.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
    }

    login(params) {
        if (this.loginForm.status === "INVALID") {
            this.missingDataAlert().present();
            return;
        }

        this.loginProvider
            .tryLogin(this.loginForm.value.rut,
                      this.loginForm.value.password)
            .subscribe(this.onLogin,
                       this.onLoginError);
    }

    onLogin(result) {
        this.navCtrl.setRoot(MenuPage);
    }

    onLoginError(error) {
        this.invalidDataAlert().present();
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
