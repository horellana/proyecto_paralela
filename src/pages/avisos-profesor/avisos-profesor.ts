import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';

@Component({
  selector: 'page-avisos-profesor',
  templateUrl: 'avisos-profesor.html'
})
export class AvisosProfesorPage {

  constructor(public navCtrl: NavController) {
  }
  goToPrincipal(params){
    if (!params) params = {};
    this.navCtrl.push(HomeEstudiantePage);
  }
}
