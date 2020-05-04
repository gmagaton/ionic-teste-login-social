import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(
        private platform: Platform,
        private facebook: Facebook,
        private google: GooglePlus,
        private firebaseAuth: AngularFireAuth,
        private router: Router) {

    }

    public login(type?: LoginSocialType): void {

    }

    public logout(): void {
        if (this.platform.is("cordova")) {
            this.facebook.logout()
                .then(res => {
                    this.router.navigate(["/login"]);
                })
                .catch(e => {
                    console.log('Error logging out into Face', e);
                });
            this.google.disconnect()
                .then(res => {
                    this.router.navigate(["/login"]);
                })
                .catch(e => {
                    console.log('Error logging out into Google', e);
                });
        } else {
            this.firebaseAuth.signOut()
                .then(res => {
                    this.router.navigate(["/login"]);
                })
                .catch(e => {
                    console.log('Error logging out into Face', e);
                });
        }
    }

    private loginFacebook() {

    }

    private loginGoogle() {

    }

    private loginUsuario(usuario: string, senha: string) {

    }

    public isLogged(): boolean {
        return false;
    }

}

export enum LoginSocialType {
    FACEBOOK, GOOGLE
}
