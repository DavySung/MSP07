import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { MainMenuComponent } from './components/shared/main-menu/main-menu.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { MembersComponent } from './components/pages/members/members.component';
import { SalesComponent } from './components/pages/sales/sales.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    MainMenuComponent,
    InventoryComponent,
    MembersComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
