import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
import { AcademiaProvider } from '../../providers/academia/academia';

@Component({
  selector: 'page-listado-estudiantes',
  templateUrl: 'listado-estudiantes.html'
})
export class ListadoEstudiantesPage {
    studentCourses = null;
    selectedCourse = null;


    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public academiaProvider: AcademiaProvider,
                public loginProvider: LoginProvider)
    {
    }

    ionViewDidLoad() {
        let loader = this.loadingCtrl.create({
            content: "Cargando informacion..."
        });

        loader.present();

        let rut = this.loginProvider.user.rut;
        let apiKey = this.loginProvider.user.apiKey;

        this.academiaProvider.student_courses_stats(rut, apiKey)
            .subscribe(
                result => {
                    console.log(result);
                    this.studentCourses = result;
                    loader.dismiss();
                },
                error => {
                    console.log("------------ Listado Estudiantes Error -------------");
                    console.log(error);
                    console.log("----------------------------------------------------");
                }
            )
    }

    loadCourseData(course) {
        let subjectCode = course.course.subject.code;
        let year = course.year;
        let semester = course.ordinal;
        let apiKey = this.loginProvider.user.apiKey;

        // this.academiaProvider.
    }
}
