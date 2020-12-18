import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-pipeline',
  templateUrl: './author-pipeline.component.html',
  styleUrls: ['./author-pipeline.component.css']
})
export class AuthorPipelineComponent implements OnInit {

  constructor() { }

  links = []
  nodes = []

  ngOnInit(): void {
  }

}
