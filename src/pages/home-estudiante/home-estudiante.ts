
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { LoginProvider } from '../../providers/login/login';
import { Student } from '../../models/student';
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

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public httpClient: HttpClient,
                public alertCtrl: AlertController,
                public loginProvider: LoginProvider,
                public academiaProvider: AcademiaProvider){

        console.log(loginProvider);
    }
    ionViewDidLoad(){
        
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
                    this.promedioRamos = this.calculateAvg(result);
                    this.ramosTomados = result.length;
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
                            labels: [ 'Aprobados', 'Reprobados']
                        }
                    });
                    this.academiaProvider.rankingStudent(result);
                },
                error => {
                    this.errorLoadingDataAlert().present()
                }
            );
    }

    calculateAvg(data : [any]) {
        let avg : number = 0;
        data.forEach(course => {
            avg = avg + course.average;
        });
        avg = avg / data.length;
        return Math.round(avg * 100) / 100;
    }

    calculateGraphData(data : [any]) {
        let aproved = 0;
        let reproved = 0;
        data.forEach(course => {
            aproved = aproved + course.aproved;
            reproved = reproved + course.reproved;
        });
        return [aproved, reproved];
    }

    errorLoadingDataAlert() {
        return this.alertCtrl.create({ title: "Error",
                                       subTitle: "Error al cargar los datos"});
    }
}
