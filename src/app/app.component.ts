import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { LoginPage } from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;

    rootPage: any = LoginPage;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
