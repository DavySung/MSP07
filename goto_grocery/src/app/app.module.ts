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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberFormComponent } from './components/shared/add-member-form/add-member-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AddInventoryComponent } from './components/pages/add-inventory/add-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    MainMenuComponent,
    InventoryComponent,
    MembersComponent,
    SalesComponent,
    AddMemberFormComponent,
    AddInventoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
