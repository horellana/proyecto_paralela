import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';
import { AlertController } from 'ionic-angular';
import { AcademiaProvider } from '../../providers/academia/academia';

@Component({
    selector: 'page-avisos-profesor',
    templateUrl: 'avisos-profesor.html'
})
export class AvisosProfesorPage {
    email: string = null;
    message: string = null;


    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public academiaProvider: AcademiaProvider
    ) {
    }

    onSendMail() {
        if (this.email.length < 1 || this.message.length < 1) {
            this.alertCtrl.create({
                title: "Error",
                subTitle: "Por favor ingrese todos los datos"
            })
                .present();
        }

        this.academiaProvider.sendMail().subscribe(
            result => {

            },
            error => {
                this.alertCtrl.create({
                    title: "Error",
                    subTitle: error
                }).present();
            }
        )
    }
}
