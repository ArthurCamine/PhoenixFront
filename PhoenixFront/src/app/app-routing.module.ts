import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: 'feed', loadChildren: './feed/feed.module#FeedModule'},
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
