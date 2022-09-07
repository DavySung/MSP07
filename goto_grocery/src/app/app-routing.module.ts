import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//layout
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';

//pages
import { HomeComponent } from './components/pages/home/home.component';
import { SalesComponent } from './components/pages/sales/sales.component';
import { MembersComponent } from './components/pages/members/members.component';
import { InventoryComponent } from './components/pages/inventory/inventory.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'Sales', component: SalesComponent },
      { path: 'Members', component: MembersComponent },
      { path: 'Inventory', component: InventoryComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
