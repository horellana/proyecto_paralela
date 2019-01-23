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

    sameCourse(studentCourse, everyoneCourse) {
        let a = studentCourse;
        let b = everyoneCourse;

        // console.log("Comparing");
        // console.log(studentCourse.course.subject.code);
        // console.log(everyoneCourse.code);

        let equal_p = (a.course.subject.code === b.code)

        // console.log(equal_p);

        return equal_p;
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
                console.log(result);
                this.studentCourses = result;
                console.log("this.studentCourses = ");
                console.log(this.studentCourses);
                this.loadEveryoneCourses();
            },
            error => {
                console.log("------------ Listado Estudiantes Error -------------");
                console.log(error);
                console.log("----------------------------------------------------");
            });
    }

    loadEveryoneCourses() {
        let requests = this.studentCourses.map(c => {
            console.log("loadEveryoneCourses");
            console.log(c);

            let code = c.course.subject.code;
            let year = c.course.year;
            let semester = c.course.ordinal;
            let apiKey = this.loginProvider.user.apiKey;

            return this.academiaProvider.course_stats(code, year, semester, apiKey);
        });

        forkJoin(requests).subscribe(
            result => {
                console.log("result");
                console.log(result);
                this.everyoneCourses = [].concat.apply([], result);
                this.loader.dismiss();

                this.prepareDataTable();
                console.log("this.everyoneCourses = ");
                console.log(this.everyoneCourses);
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

        console.log("this.table");
        console.log(this.table);
    }
}
