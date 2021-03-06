import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';
import * as math from 'mathjs'

import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

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
    ranking: number;
    ramosAprobados: number;
    ramosReprobados: number;
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
        let url = this.academiaProvider.backendUrl + `courses/students/${rut}`;
        // let url = `https://api.sebastian.cl/academia/api/v1/courses/students/${rut}/`;
        let apiKey = this.loginProvider.user.apiKey;

        this.academiaProvider.rankingStudent(rut, apiKey).subscribe(
            (data: any) => {
                this.ranking = data.position;
            },
            error => {
                this.alertCtrl.create({
                    title: "Error",
                    subTitle: "Error al cargar los datos"
                }).present();
            });

        const httpOptions = {
            headers: new HttpHeaders({ 'X-API-KEY': apiKey })
        };

        this.httpClient
            .get(url, httpOptions)
            .subscribe(
            (result: [any]) => {
                this.nombreEstudiante = result[0].student.firstName + ' ' + result[0].student.lastName;
                this.promedioRamos = this.calculateAvg(result);
                this.ramosTomados = result.length;
                this.ramosAprobados = this.calculateAproved(result);
                this.ramosReprobados = this.calculateReproved(result);
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
                            ],
                        }],
                        labels: ['Aprobados', 'Reprobados'],
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
            });
    }

    calculateStddev(data: [any]) {
        let grades = data.map(course => course.grade);
        return math.std(grades);
    }

    calculateAvg(data: [any]) {
        let avg: number = 0;
        data.forEach(course => {
            avg = avg + course.grade;
        });
        avg = avg / data.length;
        return Math.round(avg * 100) / 100;
    }

    calculateGraphData(data: [any]) {
        let aproved = 0;
        let reproved = 0;
        data.forEach(course => {
            if (course.status === "REPROBADO") {
                reproved = reproved + 1;
            }
            else {
                aproved = aproved + 1;
            }
        });
        return [aproved, reproved];
    }
    calculateReproved(data: [any]) {
        let reproved = 0;
        data.forEach(course => {
            if (course.status === "REPROBADO") {
                reproved = reproved + 1;
            }

        });
        return reproved;
    }
    calculateAproved(data: [any]) {
        let aproved = 0;
        data.forEach(course => {
            if (course.status === "APROBADO") {
                aproved = aproved + 1;
            }

        });
        return aproved;
    }

    errorLoadingDataAlert() {
        return this.alertCtrl.create({
            title: "Error",
            subTitle: "Error al cargar los datos"
        });
    }
}
