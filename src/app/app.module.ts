import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PrincipalPage } from '../pages/principal/principal';
import { ListadoEstudiantesPage } from '../pages/listado-estudiantes/listado-estudiantes';
import { CloudPage } from '../pages/cloud/cloud';
import { LoginPage } from '../pages/login/login';
import { RecuperarContraseAPage } from '../pages/recuperar-contrase-a/recuperar-contrase-a';
import { AvisosProfesorPage } from '../pages/avisos-profesor/avisos-profesor';
import { GraficoCurrsoPage } from '../pages/grafico-currso/grafico-currso';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    PrincipalPage,
    ListadoEstudiantesPage,
    CloudPage,
    LoginPage,
    RecuperarContraseAPage,
    AvisosProfesorPage,
    GraficoCurrsoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrincipalPage,
    ListadoEstudiantesPage,
    CloudPage,
    LoginPage,
    RecuperarContraseAPage,
    AvisosProfesorPage,
    GraficoCurrsoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}