import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeDocentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-docente',
  templateUrl: 'home-docente.html',
})
export class HomeDocentePage {
    promedioCursos: number;
    calculateAvg(data : [any]) {
        let avg : number = 0;

        data.forEach(course => {
            avg = avg + course.average;
        });

        avg = avg / data.length;

        return Math.round(avg * 100) / 100;
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeDocentePage');
  }

}
