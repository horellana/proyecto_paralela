import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';
import { AlertController } from 'ionic-angular';


import { AcademiaProvider } from '../../providers/academia/academia';

@Component({
    selector: 'page-recuperar-contrase-a',
    templateUrl: 'recuperar-contrase-a.html'
})
export class RecuperarContraseAPage {
    rut : string = "";


    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public academiaProvider: AcademiaProvider) {
    }

    recuperar() {
        this.academiaProvider
            .forgotPassword(this.rut)
            .subscribe(
                ok => {
                    console.log(ok);
                    this.alertCtrl
                        .create({title: 'Ok', subTitle: 'Se envio un mail'})
                        .present();

                    this.navCtrl.pop();
                },
                error => {
                    console.log(error);
                    this.alertCtrl
                        .create({title: 'Error', subTitle: error.error.message})
                        .present();
                }
            );
    }
}
