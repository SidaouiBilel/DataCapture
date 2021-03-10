import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env as environment } from '@app/env.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthorService {

    constructor(private http: HttpClient) {}

    getAll(id?){
        return this.http.get(environment.pipeline + 'dataflow/list-pipelines/'+id)
    }

    delete(id: string) {
        return this.http.delete(environment.pipeline + `dataflow/delete/${id}/`)
    }
}