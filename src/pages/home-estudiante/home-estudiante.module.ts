import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEstudiantePage } from './home-estudiante';

@NgModule({
  declarations: [
    HomeEstudiantePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEstudiantePage),
  ],
})
export class HomeEstudiantePageModule {}
