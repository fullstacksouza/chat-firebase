import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseAppConfig,AuthProviders,AngularFireModule,AuthMethods } from 'angularfire2';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SigninPage } from '../pages/signin/signin';
import { FirebaseAuthConfig } from 'angularfire2/tokens';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import {CapitalizePipe} from '../pipes/capitalize/capitalize'
import { ChatPage } from '../pages/chat/chat';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';


const firebaseAppConfig:FirebaseAppConfig = {
  apiKey: "AIzaSyCPJVqpMr7o3vJOWsUc2BRADy_O7ydqmOk",
  authDomain: "chat-ionic-firebase-e9b04.firebaseapp.com",
  databaseURL: "https://chat-ionic-firebase-e9b04.firebaseio.com",
  storageBucket: "chat-ionic-firebase-e9b04.appspot.com",
  messagingSenderId: "802469386025"
};
const firebaseAuthConfig =
{
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}
@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SignupPage,
    SigninPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseAppConfig,firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    AuthServiceProvider,
    ChatServiceProvider
  ]
})
export class AppModule {}
