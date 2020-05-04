import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  ngOnInit() {
    // this.fireAuth.onAuthStateChanged().subscribe(res =>{
    //   alert("alterou usuario: "+JSON.stringify(res));
    // });
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private router: Router,
    private fb: Facebook,
    private googlePlus: GooglePlus) { }

  async loginFacebook() {
    if (this.platform.is("cordova")) {
      await this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.fireAuth.signInWithCredential(facebookCredential)
            .then(success => {
              this.router.navigate(["/tabs/tab1"]);
            })
            .catch(e => {
              alert("Erro ao logar com facebook no firebase: "+JSON.stringify(e));
              console.log('Error logging into Facebook Firebase', e);
            });
        })
        .catch(e => {
          console.log('Error logging into Facebook', e);
        });
    } else {
      await this.fireAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res: firebase.auth.UserCredential) => {
          this.router.navigate(["/tabs/tab1"]);
        })
        .catch(e => {
          alert("Erro ao logar com facebook: "+JSON.stringify(e));
        });
    }

  }

  async loginGoogle() {

    if (this.platform.is("cordova")) {
      await this.googlePlus.login({
        "webClientId": "531724067172-utc489g8pp107gdaobos7d27eeaqprov.apps.googleusercontent.com"
      })
        .then(res => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
          this.fireAuth.signInWithCredential(googleCredential)
            .then(success => {
              this.router.navigate(["/tabs/tab2"]);
            })
            .catch(e => {  
              alert("Erro ao logar com google no firebase: "+JSON.stringify(e));
              console.log('Error logging into Facebook Firebase', e);
            });
        })
        .catch(e => {
          alert("Erro ao logar com google: "+JSON.stringify(e));
          console.log('Error logging into Google', e);
        });
    } else {
      await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res: firebase.auth.UserCredential) => {
          this.router.navigate(["/tabs/tab2"]);
        })
        .catch(e => {
          alert("Erro ao logar com google: "+JSON.stringify(e));
        });
    }
  }

  entrar() {
    alert("entrar");
  }

  tab1() {
    this.router.navigate(['/tabs']);
  }



}
