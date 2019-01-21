import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomeEstudiantePage } from '../pages/home-estudiante/home-estudiante';
import { ListadoEstudiantesPage } from '../pages/listado-estudiantes/listado-estudiantes';
import { CloudPage } from '../pages/cloud/cloud';
import { LoginPage } from '../pages/login/login';
import { RecuperarContraseAPage } from '../pages/recuperar-contrase-a/recuperar-contrase-a';
import { AvisosProfesorPage } from '../pages/avisos-profesor/avisos-profesor';
import { HomeDocentePage } from '../pages/home-docente/home-docente';
import { ListadoDocentesPage } from '../pages/listado-docentes/listado-docentes';
import { GraficoCursoPage } from '../pages/grafico-curso/grafico-curso';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from './../providers/login/login';

import { MenuPage } from '../pages/menu/menu';
import { AcademiaProvider } from '../providers/academia/academia';

@NgModule({
    declarations: [
        MyApp,
        HomeEstudiantePage,
        ListadoEstudiantesPage,
        CloudPage,
        LoginPage,
        RecuperarContraseAPage,
        AvisosProfesorPage,
        HomeDocentePage,
        MenuPage,
        ListadoDocentesPage,
        GraficoCursoPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomeEstudiantePage,
        ListadoEstudiantesPage,
        CloudPage,
        LoginPage,
        RecuperarContraseAPage,
        AvisosProfesorPage,
        HomeDocentePage,
        MenuPage,
        ListadoDocentesPage,
        GraficoCursoPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        LoginProvider,
        AcademiaProvider,
    ]
})
export class AppModule {}
