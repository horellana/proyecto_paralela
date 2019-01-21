import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { LoginProvider } from '../../providers/login/login';
import { Student } from '../../models/student';


@IonicPage()
@Component({
    selector: 'page-home-estudiante',
    templateUrl: 'home-estudiante.html',
})
export class HomeEstudiantePage {
    chart: any = null;
    nombreEstudiante: string;
    datos = [];
    promedioRamos: number;
    ramosTomados: number;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public httpClient: HttpClient,
                public alertCtrl: AlertController,
                public loginProvider: LoginProvider) {

        console.log(loginProvider);
    }

    ngOnInit() {
        let rut = this.loginProvider.user.rut;
        let url = `https://api.sebastian.cl/academia/api/v1/courses/students/${rut}/stats`;
        const httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': this.loginProvider.user.apiKey})
        };

        this.httpClient
            .get(url, httpOptions)
            .subscribe(
                (result: [any]) => {
                    this.nombreEstudiante = result[0].course.student.firstName + ' ' + result[0].course.student.lastName;
                    this.promedioRamos = this.   (result);
                    this.ramosTomados = result.length;

                    let charData = this.   (result);

                    let canvas = document.   ("canvas");
                    this.chart = new Chart(canvas, {
                        type: 'pie',
                        data: {
                            datasets: [{
                                data: charData,
                                backgroundColor: [
                                    'rgb(75, 192, 192)', // Verde
                                    'rgb(255, 99, 132)' // Rojo
                                ]
                            }],
                            labels: [ 'Aprobados', 'Reprobados']
                        }
                    });
                },
                error => {
                    this.errorLoadingDataAlert().present()
                }
            );
    }



    errorLoadingDataAlert() {
        return this.alertCtrl.create({ title: "Error",
                                       subTitle: "Error al cargar los datos"});
    }
}

