import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RecuperarContraseAPage } from '../recuperar-contrase-a/recuperar-contrase-a';
import { MenuPage } from '../menu/menu';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: any;

    constructor(public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public loginProvider: LoginProvider,
        public academiaProvider: AcademiaProvider) {

        this.loginForm = this.formBuilder.group({
            rut: ['', Validators.required],
            password: ['', Validators.required],
            backendUrl: ['', Validators.required]
        });

        this.onLogin = this.onLogin.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
    }

    login(params) {
        if (this.loginForm.status === "INVALID") {
            this.missingDataAlert().present();
            return;
        }

        this.academiaProvider.setBackendUrl(this.loginForm.value.backendUrl);

        this.academiaProvider.heartbeat().subscribe(
            ok => {
                this.loginProvider
                    .tryLogin(
                    this.loginForm.value.rut,
                    this.loginForm.value.password,
                    this.academiaProvider.backendUrl
                    )
                    .subscribe(this.onLogin,
                    this.onLoginError);

            },
            error => { this.serverDownAlert().present() }

        );
    }

    onLogin(result) {
        this.navCtrl.push(MenuPage);
    }

    onLoginError(error) {
        let message = error.status === 404 || (error.error.message == "")
            ? error.message
            : error.error.message;

        this.invalidDataAlert(message).present()
    }

    forgotPassword() {
        this.navCtrl.push(RecuperarContraseAPage);
    }

    serverDownAlert() {
        return this.alertCtrl
            .create({
                title: "Error",
                subTitle: "El backend no esta disponible"
            });
    }

    missingDataAlert() {
        return this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Por favor ingresa todos los datos'
        });
    }

    invalidDataAlert(message) {
        return this.alertCtrl.create({
            title: 'Error',
            subTitle: message
        });
    }
}
