import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoDocentesPage } from './listado-docentes';

@NgModule({
  declarations: [
    ListadoDocentesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoDocentesPage),
  ],
})
export class ListadoDocentesPageModule {}
