import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

import * as math from 'mathjs'


@IonicPage()
@Component({
    selector: 'page-home-docente',
    templateUrl: 'home-docente.html',
})
export class HomeDocentePage {
    chart: any = null;
    nombreDocente: string;
    datos = [];

    promedioCursos: number;
    ramosImpartidos: number;
    alumnosAprobados: number;
    alumnosReprobados: number;
    stddev: number = 0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public httpClient: HttpClient,
        public alertCtrl: AlertController,
        public loginProvider: LoginProvider,
        public academiaProvider: AcademiaProvider) {
    }

    ionViewDidLoad() {
        let rut = this.loginProvider.user.rut;
        let url = this.academiaProvider.backendUrl + `courses/teachers/${rut}/stats`;
        // let url = `https://api.sebastian.cl/academia/api/v1/courses/teachers/${rut}/stats`;
        const httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': this.loginProvider.user.apiKey })
        };

        this.httpClient
            .get(url, httpOptions)
            .subscribe(
            (result: [any]) => {
                this.nombreDocente = result[0].course.teacher.firstName + ' ' + result[0].course.teacher.lastName;
                this.promedioCursos = this.calculateAvg(result);
                this.ramosImpartidos = result.length;
                this.alumnosAprobados = this.calculateGraphData(result)[0];
                this.alumnosReprobados = this.calculateGraphData(result)[1];
                this.stddev = this.calculateStddev(result);

                let charData = this.calculateGraphData(result);
                let canvas = document.getElementById("canvas");
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
                        labels: ['Aprobados', 'Reprobados']
                    },
                    options: {
                        plugins: {
                            render: 'percentage'
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Aprobados vs Reprobados',
                            fontSize: 15
                        },
                        labels: {
                            render: 'percentage',
                            precision: 2
                        }
                    }
                });
            },
            error => {
                this.errorLoadingDataAlert().present()
            }
            );
    }

    calculateStddev(data: [any]) {
        let averages = data.map(course => course.average);
        return math.std(averages);
    }

    calculateAvg(data: [any]) {
        let avg: number = 0;
        data.forEach(course => {
            avg = avg + course.average;
        });
        avg = avg / data.length;
        return Math.round(avg * 100) / 100;
    }

    calculateGraphData(data: [any]) {
        let aproved = 0;
        let reproved = 0;

        data.forEach(course => {
            aproved = aproved + course.aproved;
            reproved = reproved + course.reproved;
        });

        return [aproved, reproved];
    }

    errorLoadingDataAlert() {
        return this.alertCtrl.create({
            title: "Error",
            subTitle: "Error al cargar los datos"
        });
    }
}
