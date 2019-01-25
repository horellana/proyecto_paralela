import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';
import { AlertController } from 'ionic-angular';
import { AcademiaProvider } from '../../providers/academia/academia';
import { LoginProvider } from '../../providers/login/login';

@Component({
    selector: 'page-avisos-profesor',
    templateUrl: 'avisos-profesor.html'
})
export class AvisosProfesorPage {
    email: string = '';
    message: string = '';
    subject: string = '';

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public academiaProvider: AcademiaProvider,
        public loginProvider: LoginProvider
    ) {
    }

    onSendMail() {
        if (this.email.length < 1 || this.message.length < 1 || this.subject.length < 1) {
            this.alertCtrl.create({
                title: "Error",
                subTitle: "Por favor ingrese todos los datos"
            })
                .present();
        }

        this.academiaProvider.sendMail(
            this.email,
            this.subject,
            this.message,
            "adasda",
            this.loginProvider.user.apiKey
        )
            .subscribe(
            result => {
                this.alertCtrl.create({
                    title: "Ok",
                    subTitle: "Se envio el anuncio"
                }).present();
            },
            error => {
                this.alertCtrl.create({
                    title: "Error",
                    subTitle: error.error.message
                }).present();
            }
            )
    }
}
