import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { forkJoin } from "rxjs/observable/forkJoin";

import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

@Component({
    selector: 'page-listado-estudiantes',
    templateUrl: 'listado-estudiantes.html'
})
export class ListadoEstudiantesPage {
    studentCourses = null;
    everyoneCourses = null;

    loader = null;


    table = [];

    constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public academiaProvider: AcademiaProvider,
        public loginProvider: LoginProvider) {
    }

    ionViewDidLoad() {
        this.loadStudentCourses();
    }

    loadStudentCourses() {
        this.loader = this.loadingCtrl.create({
            content: "Cargando informacion..."
        });
        this.loader.present();

        let rut = this.loginProvider.user.rut;
        let apiKey = this.loginProvider.user.apiKey;

        this.academiaProvider.student_courses_stats(rut, apiKey).subscribe
            (
            result => {
                this.studentCourses = result;
                this.loadEveryoneCourses();
            },
            error => {
            });
    }

    loadEveryoneCourses() {
        let requests = this.studentCourses.map(c => {
            let code = c.course.subject.code;
            let year = c.course.year;
            let semester = c.course.ordinal;
            let apiKey = this.loginProvider.user.apiKey;

            return this.academiaProvider.course_stats(code, year, semester, apiKey);
        });

        forkJoin(requests).subscribe(
            result => {
                this.everyoneCourses = [].concat.apply([], result);
                this.loader.dismiss();
                this.prepareDataTable();
            }
        )
    }

    prepareDataTable() {
        this.table = [];

        for (let c of this.studentCourses) {
            for (let s of this.everyoneCourses) {
                if (c.course.code === s.uniqueCode
                ) {
                    this.table.push({
                        courseName: c.course.subject.name,
                        studentAvg: c.grade,
                        everyoneAvg: s.average,
                        everyoneStddev: s.stddev,
                        semester: s.semester,
                        year: s.year
                    });

                }

            }
        }
    }
}
