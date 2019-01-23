import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { forkJoin } from "rxjs/observable/forkJoin";

import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

import { Chart } from 'chart.js';

@Component({
    selector: 'page-grafico-curso',
    templateUrl: 'grafico-curso.html'
})
export class GraficoCursoPage {
    name: string = null;

    years = [];
    courses = [];

    constructor(public navCtrl: NavController,
        public academiaProvider: AcademiaProvider,
        public loginProvider: LoginProvider) {
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
                console.log("------------------------- RESULT ----------------------");
                console.log(result);
                console.log("-------------------------------------------------------");

                this.courses = result.map(c => {
                    return {
                        year: c.course.year,
                        grade: c.grade,
                        code: c.course.subject.code,
                        ordinal: c.course.ordinal,
                    }
                });
                this.years = this.uniques(this.courses.map(c => c.year));
                console.log("Años");
                console.log(this.years);

                console.log("VOYY AS ASDAS GRAFICAOSASD");
                this.showGraph();

                console.log(this.courses);
                console.log(this.years);
            },
            error => {
            }
        );
    }

    showGraph() {
        let requests = this.courses
            .map(c => {
                console.log("------------------- C ---------------------")
                console.log(c);
                console.log("-------------------------------------------");

                console.log(c.year);

                let code = c.code;
                let year = c.year;
                let semester = c.ordinal;
                let apiKey = this.loginProvider.user.apiKey;

                console.log([code, year, semester, apiKey]);
                return this.academiaProvider.course_stats(code, year, semester, apiKey);
            })

        forkJoin(requests).subscribe(
            result => {
                result = [].concat.apply([], result);

                console.log("RESSSSSUUUUUUULT");
                console.log(result);

                console.log("YEARRSSS");
                console.log(this.years);

                console.log("Resullllt");
                console.log(result);

                let studentAvg = this.calculateStudentAverages(this.courses);
                let everyoneAvg = this.calculateStudentAverages(result);

                console.log("studentAvg: " + studentAvg);
                console.log("EveryoneAvg: " + everyoneAvg);

                console.log("Cargando grafico");
                let canvas = document.getElementById("canvas");
                let chart = new Chart(canvas, {
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
            },
            error => { }
        );

    }

    calculateStudentAverages(courses) {
        console.log("-------------------- Calculate averages ---------------------");
        console.log(courses);
        console.log("-------------------------------------------------------------");

        let averages = [];


        let sortedCourses = courses.sort((a, b) => a.year - b.year);

        for (let i = 0; i < this.years.length; i++) {
            let year = this.years[i];
            let thisYearCourses = sortedCourses.filter(c => c.year == year);
            console.log("thisyearscourses");
            console.log(thisYearCourses);
            let count = thisYearCourses.length;
            console.log("summmmm");
            let sum = thisYearCourses.reduce((a, b) => {
                console.log("a = " + a);
                console.log(b);
                console.log(a + " + " + b.grade);

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
