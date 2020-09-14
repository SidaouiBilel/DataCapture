import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-env-tag',
  templateUrl: './env-tag.component.html',
  styleUrls: ['./env-tag.component.css']
})
export class EnvTagComponent implements OnInit {

  constructor() { }
  env = null
  color = null

  ngOnInit() {
    this.env = String(environment.env).toUpperCase()
    this.color = this.getColor(this.env)
  }


  getColor(env){
    switch(env){
      case 'TST': return 'red'
      case 'PRD': return 'blue'
      case 'DEV': return 'green'
    }
  }

}
