import { Component,  ViewChild } from '@angular/core';
import { IonicPage, NavController, App,  Nav } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { LoginProvider } from '../../providers/login/login';

import { HomeEstudiantePage } from '../../pages/home-estudiante/home-estudiante';
import { ListadoEstudiantesPage } from '../../pages/listado-estudiantes/listado-estudiantes';

import { HomeDocentePage } from '../../pages/home-docente/home-docente';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    @ViewChild(Nav) nav: Nav;

    pages : [any] = null;

    docentePages : [any] = [
        { title: "Home",
          page: HomeDocentePage,
          icon: "ios-home-outline" },
    ];

    alumnoPages : [any] = [
        { title: "Home",
          page: HomeEstudiantePage,
          icon: "ios-home-outline" },

        { title: "Listado Estudiantes",
          page: ListadoEstudiantesPage,
          icon: "ios-list-box-outline" }
    ];

    constructor(
        public loginProvider: LoginProvider,
        public navCtrl: NavController,
        private appCtrl: App
        ) {

    }

    logout() {
        this.navCtrl.setRoot(LoginPage);
    }

    ionViewWillEnter() {
        if (this.loginProvider.user.role === "Docente") {
            this.pages = this.docentePages;
            this.nav.setRoot(HomeDocentePage);
        }
        else {
            this.pages = this.alumnoPages;
        }

        console.log(this.pages);
    }
}