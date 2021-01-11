import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connector-types',
  templateUrl: './connector-types.component.html',
  styleUrls: ['./connector-types.component.css']
})
export class ConnectorTypesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchTerm = ''
  
  types = [
    {type:'sqlserver', label:'SQL Server'},
    {type:'postgres', label:'PostgresSQL'},
    {type:'azure_blob_storage', label:'Azure Blob Storage'},
    {type:'amazon_storage', label:'AWS S3'},
  ]

}
