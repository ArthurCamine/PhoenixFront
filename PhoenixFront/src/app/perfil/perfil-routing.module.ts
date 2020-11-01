import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoRestritoGuard } from '../shared/route-guards/acesso-restrito.guard';
import { PerfilComponent } from './perfil.component';


const routes: Routes = [
  { path: '', component: PerfilComponent, data: { label: 'Perfil'}, canActivate: [AcessoRestritoGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
