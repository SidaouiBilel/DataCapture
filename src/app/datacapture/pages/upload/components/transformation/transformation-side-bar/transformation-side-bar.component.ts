import { Component, OnInit } from '@angular/core';
import { PreMappingTransformationService } from '../../../services/pre-mapping-transformation.service';
import { TranformationService } from '../services/tranformation.service';

@Component({
  selector: 'app-transformation-side-bar',
  templateUrl: './transformation-side-bar.component.html',
  styleUrls: ['./transformation-side-bar.component.css']
})
export class TransformationSideBarComponent implements OnInit {

  pipeInfo = null;

  constructor(private pipes: TranformationService) { 
    this.pipes.edited$.subscribe((info)=>{
      this.pipeInfo = {};
      if (info) {
        this.pipeInfo = {...info};
      }
    })
  }
  
  saved = true
  ngOnInit() {
  }

  onChanged(){
    this.pipes.updateEdited(this.pipeInfo)
  }

}
