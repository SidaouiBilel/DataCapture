import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  loading: boolean;
  @Input() pipelines = [];
  constructor() { }

  ngOnInit(): void {
  }

}
