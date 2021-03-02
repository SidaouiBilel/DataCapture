import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env as environment } from '@app/env.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthorService {

    constructor(private http: HttpClient) {}

    getAll(page?, size?){
        return this.http.get(environment.pipeline + 'dataflow/list-pipelines')
    }

    delete(id: string) {
        return this.http.delete(environment.pipeline + `dataflow/delete/${id}/`)
    }
}