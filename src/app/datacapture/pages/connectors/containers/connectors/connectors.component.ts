import { Component, OnInit } from '@angular/core';
import { ConnectorsUtilsService } from '../../services/connectors-utils.service';
import { ConnectorsService } from '../../services/connectors.service';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {

  constructor(private service:ConnectorsService, public utils: ConnectorsUtilsService) { }

  ngOnInit(): void {
  }

  loadData(){

  }
}
