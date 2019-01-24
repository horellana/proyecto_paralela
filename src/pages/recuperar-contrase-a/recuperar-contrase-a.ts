import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { AcademiaProvider } from '../../providers/academia/academia';

@Component({
    selector: 'page-recuperar-contrase-a',
    templateUrl: 'recuperar-contrase-a.html'
})
export class RecuperarContraseAPage {
    rut: string = "";
    backend: string = "";

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public academiaProvider: AcademiaProvider) {

        this.backend = this.academiaProvider.backendUrl;
    }

    recuperar() {
        if (this.rut.length < 1 || this.backend.length < 1) {
            this.alertCtrl.
                create({ title: "Error", subTitle: "Por favor ingrese todos los datos" })
                .present();
            return;
        }

        this.academiaProvider.setBackendUrl(this.backend);

        this.academiaProvider
            .forgotPassword(this.rut)
            .subscribe(
            ok => {
                this.alertCtrl
                    .create({ title: 'Ok', subTitle: 'Se envio un mail' })
                    .present();

                this.navCtrl.pop();
            },
            error => {
                this.alertCtrl
                    .create({ title: 'Error', subTitle: error.error.message })
                    .present();
            }
            );
    }
}
