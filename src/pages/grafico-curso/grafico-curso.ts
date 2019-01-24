import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { forkJoin } from "rxjs/observable/forkJoin";

import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

import { Chart } from 'chart.js';

import { LoadingController } from 'ionic-angular';


@Component({
    selector: 'page-grafico-curso',
    templateUrl: 'grafico-curso.html'
})
export class GraficoCursoPage {
    chart = null;
    name: string = null;

    years = [];
    courses = [];

    constructor(public navCtrl: NavController,
        public academiaProvider: AcademiaProvider,
        public loginProvider: LoginProvider,
        public loadingCtrl: LoadingController, ) {
    }

    getStudentsCourseStats(courseCode) {
        for (let course of this.courses) {
            if (course.course.subject.code == courseCode) {
                return { grade: course.grade };
            }
        }
    }

    ionViewDidLoad() {
        let rut = this.loginProvider.user.rut;
        let apiKey = this.loginProvider.user.apiKey;

        this.academiaProvider.getStudent(rut, apiKey).subscribe(
            (result: any) => {
                this.name = `${result.firstName} ${result.lastName}`;
            },
            error => {
            }
        );

        this.academiaProvider.student_courses_stats(rut, apiKey).subscribe(
            (result: any) => {
                this.courses = result
                    .map(c => {
                        return {
                            year: c.course.year,
                            grade: c.grade,
                            code: c.course.subject.code,
                            ordinal: c.course.ordinal,
                        }
                    })
                    .sort((a, b) => a.year - b.year);

                this.years = this.uniques(this.courses.map(c => c.year));
                this.showGraph();
            },
            error => {
            }
        );
    }

    showGraph() {
        let loader = this.loadingCtrl.create({
            content: "Cargando informacion..."
        });

        loader.present();



        let requests = this.courses
            .map(c => {
                let code = c.code;
                let year = c.year;
                let semester = c.ordinal;
                let apiKey = this.loginProvider.user.apiKey;

                return this.academiaProvider.course_stats(code, year, semester, apiKey);
            })

        forkJoin(requests).subscribe(
            result => {
                result = [].concat.apply([], result)
                    .sort((a, b) => a.year - b.year);

                let studentAvg = this.calculateStudentAverages(this.courses);
                let everyoneAvg = this.calculateStudentAverages(result);

                let canvas = document.getElementById("canvas");
                this.chart = new Chart(canvas, {
                    type: "line",
                    data: {
                        labels: this.years,
                        datasets: [
                            {
                                data: studentAvg,
                                borderColor: "#00f",
                                label: "Estudiante"
                            },
                            {
                                data: everyoneAvg,
                                borderColor: "#f00",
                                label: "Todos"
                            }
                        ]
                    }


                });

                loader.dismiss();
            },
            error => { }
        );

    }

    calculateStudentAverages(courses) {
        let averages = [];

        let sortedCourses = courses.sort((a, b) => a.year - b.year);

        for (let i = 0; i < this.years.length; i++) {
            let year = this.years[i];
            let thisYearCourses = sortedCourses.filter(c => c.year == year);
            let count = thisYearCourses.length;
            let sum = thisYearCourses.reduce((a, b) => {
                if (b.grade) {
                    return a + b.grade;
                }
                else {
                    return a + b.average;
                }

            }, 0);

            averages[i] = sum / count;
        }

        return averages;
    }

    uniques(data: any[]) {
        let onlyUniques = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        return data.filter(onlyUniques);
    }
}
