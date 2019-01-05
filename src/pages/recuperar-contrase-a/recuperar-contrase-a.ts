import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';

@Component({
  selector: 'page-recuperar-contrase-a',
  templateUrl: 'recuperar-contrase-a.html'
})
export class RecuperarContraseAPage {

  constructor(public navCtrl: NavController) {
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToRecuperarContraseA(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RecuperarContraseAPage);
  }goToPrincipal(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomeEstudiantePage);
  }
}
