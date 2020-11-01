import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogadoGuard } from '../shared/route-guards/logado.guard';
import { LoginComponent } from './login.component';


const routes: Routes = [
  { path: '', component: LoginComponent, data: { label: 'Login'}, canActivate: [LogadoGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
