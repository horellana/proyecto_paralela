import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

    shownCount = 0;

    constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public academiaProvider: AcademiaProvider,
        public loginProvider: LoginProvider) {
    }

    ionViewDidLoad() {
        this.table = [];
        this.loadStudentCourses();
    }

    loadStudentCourses() {
        let rut = this.loginProvider.user.rut;
        let apiKey = this.loginProvider.user.apiKey;

        this.academiaProvider.student_courses_stats(rut, apiKey).subscribe
            (
            result => {
                this.studentCourses = result;
                this.loadEveryoneCourses();
            },
            error => {
                this.alertCtrl.create({
                    title: 'Error',
                    subTitle: "Error al cargar los datos"
                });
            });
    }

    loadEveryoneCourses() {
        let slice = this.studentCourses.slice(this.shownCount, this.shownCount + 2)

        let requests = slice
            .map(c => {
                let code = c.course.subject.code;
                let year = c.course.year;
                let semester = c.course.ordinal;
                let apiKey = this.loginProvider.user.apiKey;

                return this.academiaProvider.course_stats(code, year, semester, apiKey);
            });

        forkJoin(requests).subscribe(
            result => {
                this.everyoneCourses = [].concat.apply([], result);
                this.prepareDataTable();
            }
        )

        if (this.shownCount <= this.studentCourses.length) {
            setTimeout(() => this.loadEveryoneCourses(), 1000);
        }
    }

    prepareDataTable() {
        let slice = this.studentCourses.slice(this.shownCount, this.shownCount + 5)

        for (let c of slice) {
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

        this.shownCount = this.shownCount + 2;
    }
}
