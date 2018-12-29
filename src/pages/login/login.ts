import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecuperarContraseAPage } from '../recuperar-contrase-a/recuperar-contrase-a';
import { PrincipalPage } from '../principal/principal';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToRecuperarContraseA(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RecuperarContraseAPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToPrincipal(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PrincipalPage);
  }
}
