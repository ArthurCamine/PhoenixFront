import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { SharedModule } from '../shared/shared.module';
import { CardPostComponent } from './post/card-post.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FeedComponent, CardPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    FeedRoutingModule,
    SharedModule
  ]
})
export class FeedModule { }
