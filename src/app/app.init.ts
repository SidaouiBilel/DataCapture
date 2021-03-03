import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {updateConfig} from "./env.service";
@Injectable()
export class AppInitService {

    constructor(private http: HttpClient){}

    public init() {
        return new Promise((resolve, reject) => {
            fetch('assets/data-config.json?nocache='+(new Date()).getTime())
                .then(res=>(res.json()))
                .then(config => {
                    // console.log({...environment , ...config});
                    updateConfig({...environment , ...config});
                    resolve(true);
                })
        })
    }
}