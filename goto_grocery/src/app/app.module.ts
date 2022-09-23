import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { MainMenuComponent } from './components/shared/main-menu/main-menu.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { MembersComponent } from './components/pages/members/members.component';
import { SalesComponent } from './components/pages/sales/sales.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateTransactionFormComponent } from './components/shared/create-transaction-form/create-transaction-form.component';
import { UpdateTransactionFormComponent } from './components/shared/update-transaction-form/update-transaction-form.component';
import { AddInventoryComponent } from './components/shared/add-inventory/add-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    MainMenuComponent,
    InventoryComponent,
    MembersComponent,
    SalesComponent,
    CreateTransactionFormComponent,
    UpdateTransactionFormComponent,
    AddInventoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
