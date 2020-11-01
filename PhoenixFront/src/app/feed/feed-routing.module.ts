import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoRestritoGuard } from '../shared/route-guards/acesso-restrito.guard';
import { FeedComponent } from './feed.component';


const routes: Routes = [
  { path: '', component: FeedComponent, data: { label: 'Feed'}, canActivate: [AcessoRestritoGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
