import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { SelectDataComponent } from './components/select-data/select-data.component';



@NgModule({
  declarations: [LayoutComponent, SelectDataComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    SelectDataComponent
  ]
})
export class SharedModule { }
