import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {updateConfig} from "./env.service";
@Injectable()
export class AppInitService {

    constructor(){}

    public init() {
        return new Promise((resolve, reject) => {
            fetch((window["dk-data-deployUrl"] || "")+'assets/data-config.json?nocache='+(new Date()).getTime())
                .then(res=>(res.json()))
                .then(config => {
                    // console.log({...environment , ...config});
                    updateConfig({...environment , ...config});
                    resolve(true);
                })
        })
    }
}