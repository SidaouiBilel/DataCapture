import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url = environment.admin

  constructor(private http: HttpClient) { }

  saveDictionary(dict){
    return this.http.post( this.url + "dictionary/", dict)
  }

  getAllDictionaries(){
    return this.http.get( this.url + "dictionary/")
  }

  deleteDictionary(dict){
    return this.http.delete( this.url + "dictionary/"+dict.id)
  }
}
