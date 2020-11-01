import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html'
})
export class CardPostComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
