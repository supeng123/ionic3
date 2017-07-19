import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import {TabsPage} from '../pages/tabs/tabs';
import {EditRecipePage} from '../pages/edit-recipe/edit-recipe';
import {RecipePage} from '../pages/recipe/recipe';
import {RecipesPage} from '../pages/recipes/recipes';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {ShoppingListService} from "../services/shoppingListService";
import {RecipesService} from "../services/recipes";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";
import {SLOptionsPage} from "../pages/database-options/sl-options";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
      SigninPage,
      SignupPage,
      SLOptionsPage
  ],
  imports: [
    BrowserModule,
      HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    SigninPage,
    SignupPage,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
      ShoppingListService,
      RecipesService,
      AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
