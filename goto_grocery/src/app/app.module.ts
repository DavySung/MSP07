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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateTransactionFormComponent } from './components/shared/create-transaction-form/create-transaction-form.component';
import { UpdateTransactionFormComponent } from './components/shared/update-transaction-form/update-transaction-form.component';
import { AddInventoryComponent } from './components/shared/add-inventory/add-inventory.component';
import { CreateMemberFormComponent } from './components/shared/create-member-form/create-member-form.component';
import { UpdateMemberFormComponent } from './components/shared/update-member-form/update-member-form.component';
import { UpdateInventoryFormComponent } from './components/shared/update-inventory-form/update-inventory-form.component';
import { LoginComponent } from './components/pages/login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { LoginFormComponent } from './components/shared/login-form/login-form.component';

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
    CreateMemberFormComponent,
    UpdateMemberFormComponent,
    UpdateInventoryFormComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
