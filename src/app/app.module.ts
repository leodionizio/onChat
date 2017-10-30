import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { HomePage } from '../pages/home/home';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';

import { AuthService } from './../providers/auth/auth.service';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from './../providers/message/message.service';
import { UserService } from './../providers/user/user.service';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// arquivo de configurações do firebase, que vc obtém através do seu console no próprio firebase
// importado de outro arquivo restrito.
import firebaseAppConfig from './firebase.config';
//
//ou pode ser declarado aqui seguindo o exemplo:
// const firebaseAppConfig: FirebaseAppConfig = {
//  apiKey: " /// ",
//  authDomain: " /// ",
//  databaseURL: " /// ",
//  storageBucket: " /// ",
//  messagingSenderId: " /// "
// }

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    HomePage,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    HomePage,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ChatService,
    MessageService,
    UserService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
