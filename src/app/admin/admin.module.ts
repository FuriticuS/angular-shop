import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayotComponent} from "./shared/admin-layot/admin-layot.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations:[
    AdminLayotComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'', component: AdminLayotComponent, children: [
          {path:'', redirectTo:'/admin/login', pathMatch: 'full'},
          {path:'login', component: LoginPageComponent},
          {path:'dashboard', component: DashboardPageComponent},
          {path: 'add', component: AddPageComponent},
          {path:'orders', component: OrdersPageComponent},
          {path: 'product/:id/edit', component: EditPageComponent}
        ]
      }
    ])
  ],
  exports:[RouterModule]
})

export class AdminModule {

}
