import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomeEstudiantePage } from '../pages/HomeEstudiante/home_estudiante';
import { ListadoEstudiantesPage } from '../pages/listado-estudiantes/listado-estudiantes';
import { RecuperarContraseAPage } from '../pages/recuperar-contrase-a/recuperar-contrase-a';
import { GraficoCurrsoPage } from '../pages/grafico-currso/grafico-currso';


import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToPrincipal(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomeEstudiantePage);
  }goToListadoEstudiantes(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ListadoEstudiantesPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToRecuperarContraseA(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RecuperarContraseAPage);
  }goToGraficoCurrso(params){
    if (!params) params = {};
    this.navCtrl.setRoot(GraficoCurrsoPage);
  }
}
