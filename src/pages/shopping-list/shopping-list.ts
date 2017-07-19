import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shoppingListService"
import {Ingredient} from "../../models/ingredient";
import {SLOptionsPage} from "../database-options/sl-options";
import {AuthService} from "../../services/auth";


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private slService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadCtr: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  loadItems() {
    this.listItems = this.slService.getItems();
  }

  handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title:'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    })
    alert.present();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent){
    const loading = this.loadCtr.create({
      content: 'Please waiting...'
    });
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if(data.action== 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
            .then(
                (token:string)=>{
                  this.slService.fetchList(token).subscribe(
                      (list: Ingredient[]) =>{
                        loading.dismiss();
                        if(list){
                          this.listItems = list;
                        }else{
                          this.listItems= [];
                        }
                      },
                      (error)=>{
                        loading.dismiss();
                        this.handleError(error.message);
                        console.log(error);
                      }
                  )
                }
            )
      }else if(data.action =='store'){
        loading.present();
        this.authService.getActiveUser()
            .getToken()
            .then((token: string) =>{
                this.slService.storeList(token)
                    .subscribe(
                        (data)=>{
                          loading.dismiss();
                          console.log('success')
                        },
                        (error)=>{
                          loading.dismiss();
                          this.handleError(error.message);
                          console.log('error')
                        }
                    );

            });
      }
    })
  }
}
