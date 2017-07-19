import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignUp(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you up ...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
        .then(data => {
          console.log(data);
          loading.dismiss();
        })
        .catch(error => {
          loading.dismiss();
          console.log(error)
          const alert = this.alertCtrl.create({
            title: 'Signup failed！',
            message: error.message,
            buttons: ['Ok']
          });

          alert.present();
        });
  }

}
