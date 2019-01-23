import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDocentePage } from './home-docente';

@NgModule({
    declarations: [
        HomeDocentePage,
    ],
    imports: [
        IonicPageModule.forChild(HomeDocentePage),
    ],
})
export class HomeDocentePageModule { }
