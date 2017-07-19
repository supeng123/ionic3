import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignIn(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in ...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
        .then(data =>{
          console.log(data);
          loading.dismiss();
        })
        .catch(error =>{
          loading.dismiss();
          console.log(error)
          const alert = this.alertCtrl.create({
            title: 'SignIn failed！',
            message: error.message,
            buttons: ['Ok']
          });

          alert.present();
        })
  }



}
