import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

// import { catchError, map, tap, flatMap } from 'rxjs/operators';

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
                public academiaProvider: AcademiaProvider)
    {
    }

    ionViewDidLoad() {
        this.academiaProvider
            .teacher_courses_stats(this.loginProvider.user.rut,
                                   this.loginProvider.user.apiKey)
            .subscribe(data => { this.handleData(data)},
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
        let courseData = this.data.filter(c => c.name ==  this.course)[0];

        console.log(this.loginProvider.user);
        console.log(apiKey);

        let requests = this.data
            .filter(c => c.name == this.course)
            .map(c => this.academiaProvider.course_stats(courseData.code, c.year, c.semester, apiKey))

        forkJoin(requests).subscribe(
            (result) => {
                this.shownCourses = [].concat.apply([], result);
                loader.dismiss();
            }
        );

    }

    failedDataLoadAlert(message) {
        return this.alertCtrl.create({title: 'Error',
                                      subTitle: message});
    }

    uniques(data: any[]) {
        let onlyUniques = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        return data.filter(onlyUniques);
    }
}
