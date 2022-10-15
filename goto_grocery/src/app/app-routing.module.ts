import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//layout
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';

//pages
import { HomeComponent } from './components/pages/home/home.component';
import { SalesComponent } from './components/pages/sales/sales.component';
import { MembersComponent } from './components/pages/members/members.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';
import { AddInventoryComponent } from './components/shared/add-inventory/add-inventory.component';
import { UpdateInventoryFormComponent } from './components/shared/update-inventory-form/update-inventory-form.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'Sales', component: SalesComponent, canActivate: [AuthGuard] },
      { path: 'Members', component: MembersComponent, canActivate: [AuthGuard] },
      { path: 'Inventory', component: InventoryComponent, canActivate: [AuthGuard] },
      { path: 'AddInventory', component: AddInventoryComponent, canActivate: [AuthGuard] },
      { path: 'UpdateInventoryForm', component: UpdateInventoryFormComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
