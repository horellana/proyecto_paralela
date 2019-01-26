import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

import { Teacher } from '../../models/teacher';

import { forkJoin } from "rxjs/observable/forkJoin";

/**
 * Generated class for the ListadoDocentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-listado-docentes',
    templateUrl: 'listado-docentes.html',
})
export class ListadoDocentesPage {
    data = [];
    shownCourses = [];

    availableYears = [];
    availableSemesters = [];
    availableCourses = [];

    year = null;
    semester = null;
    course = null;
    teacherName = null;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public loginProvider: LoginProvider,
        public academiaProvider: AcademiaProvider) {
    }

    ionViewDidLoad() {
        let rut = this.loginProvider.user.rut
        let apiKey = this.loginProvider.user.apiKey

        this.academiaProvider
            .teacher_courses_stats(rut, apiKey)
            .subscribe
            (
            data => { this.handleData(data) },
            error => { this.failedDataLoadAlert(error).present(); }
            );

        this.academiaProvider
            .getTeacher(this.loginProvider.user.rut, this.loginProvider.user.apiKey)
            .subscribe((result: Teacher) => {
                this.teacherName = `${result.firstName} ${result.lastName}`;
            });
    }

    handleData(data: any[]) {
        this.data = data;

        this.availableCourses = this.uniques(this.data.map(c => c.name));
        this.course = this.availableCourses[0];

        this.onCourseSelect();
    }

    onCourseSelect() {
        let loader = this.loadingCtrl.create({
            content: "Cargando informacion..."
        });

        loader.present();

        this.shownCourses = [];

        let apiKey = this.loginProvider.user.apiKey;
        let courseData = this.data.filter(c => c.name == this.course)[0];

        console.log(this.data);
        console.log(courseData);

        let requests = this.data
            .filter(c => c.name == this.course)
            .map(c => this
                .academiaProvider
                .course_stats(c.code, c.year, c.semester, apiKey)
            );


        forkJoin(requests).subscribe(
            (result) => {
                let data = [].concat.apply([], result).sort((a, b) => {
                    // return 1 => a es mayor
                    // return 0 => a == b
                    // return -1 => a < b
                    if (a.year > b.year) {
                        return 1;
                    }
                    else if (a.year < b.year) {
                        return -1;
                    }
                    else if (a.semester > b.semester) {
                        return 1;
                    }
                    else if (a.semester < b.semester) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                })
                    .reverse();

                this.shownCourses = data;
                loader.dismiss();
            },

            (error) => {
                console.log(error);
                this.failedDataLoadAlert(error.error.message).present();
                loader.dismiss();
            }
        );

    }

    failedDataLoadAlert(message) {
        return this.alertCtrl.create({
            title: 'Error',
            subTitle: message
        });
    }

    uniques(data: any[]) {
        let onlyUniques = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        return data.filter(onlyUniques);
    }
}
