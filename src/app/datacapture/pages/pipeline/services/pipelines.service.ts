import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PipelinesService {

  constructor(private http: HttpClient) { }


  publishDag(nodes, links, id){
    return this.http.post(environment.pipeline + 'dags/' ,{nodes, links, id})
  }

  saveDag(nodes, links, id){
    
  }

  runDag(dag_id){

  }

  getDags(){

  }

  monitorDagRun(run_id){

  }

  getDagRuns(dag_id){

  }

  deleteDag(dag_id){

  }
}
