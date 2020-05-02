import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(private platform: Platform, private router: Router, private fb: Facebook, private googlePlus: GooglePlus) { }

  logout() {
    alert("logout face");
    if (this.platform.is("cordova")) {
      this.fb.logout()
        .then(res => {
          alert("logout ok");
          this.router.navigate(["/login"]);
        })
        .catch(e => {
          alert("Erro: " + JSON.stringify(e));
          console.log('Error logging out into Face', e);
        });
    } else {
      alert("web");
    }
  }

}
