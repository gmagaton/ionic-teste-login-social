import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  ngOnInit() {

  }

  constructor(private platform: Platform, private router: Router, private fb: Facebook, private googlePlus: GooglePlus) { }

  async loginFacebook() {
    if (this.platform.is("cordova")) {
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
          alert("Logou Face");
          console.log('Logged into Facebook!', res);
          this.router.navigate(["/tabs/tab1"]);
        })
        .catch(e => console.log('Error logging into Facebook', e));
    } else {
      alert("web");
      ;
    }

  }

  loginGoogle() {
    if (this.platform.is("cordova")) {
      this.googlePlus.login({})
        .then(res => {
          alert("Logou google");
          console.log('Logged into Google!', res);
          this.router.navigate(["/tabs/tab2"]);
        })
        .catch(e => console.log('Error logging into Google', e));
    } else {
      alert("web");
    }
  }

  entrar() {
    alert("entrar");
  }

  tab1() {
    this.router.navigate(['/tabs']);
  }



}
