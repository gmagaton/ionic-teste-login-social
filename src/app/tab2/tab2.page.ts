import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private platform: Platform, private router: Router, private fb: Facebook, private googlePlus: GooglePlus) { }

  logout() {
    alert("logout google");
    if (this.platform.is("cordova")) {
      this.googlePlus.disconnect()
        .then(res => {
          alert("logout ok");
          this.router.navigate(["/login"]);
        })
        .catch(e => {
          alert("Erro: " + JSON.stringify(e));
          console.log('Error logging out into Google', e);
        });
    } else {
      alert("web");
    }
  }

}
