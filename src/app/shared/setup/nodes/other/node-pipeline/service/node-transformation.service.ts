import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env as environment } from '@app/env.service';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NodeTranformationService {
    constructor(private http: HttpClient) {}

    getAllPipes(): Observable<any> {
        return this.http.get(environment.transform);
    }
}