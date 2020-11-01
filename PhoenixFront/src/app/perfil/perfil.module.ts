import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilRoutingModule,
    SharedModule
  ]
})
export class PerfilModule { }
