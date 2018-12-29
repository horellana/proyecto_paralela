import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';

@Component({
  selector: 'page-avisos-profesor',
  templateUrl: 'avisos-profesor.html'
})
export class AvisosProfesorPage {

  constructor(public navCtrl: NavController) {
  }
  goToPrincipal(params){
    if (!params) params = {};
    this.navCtrl.push(PrincipalPage);
  }
}
