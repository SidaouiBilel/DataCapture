import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WordService {

  url = environment.admin

  constructor(private http: HttpClient) { }

  getAllWords(dict_id) {
    return this.http.get(this.url + "word/" + dict_id)
  }

  saveWord(cat): Observable<any> {
    return this.http.post(this.url + "word/", cat)
  }

  deleteWord(cat: any): Observable<any> {
    return this.http.delete(this.url + "word/" + cat['id']);
  }

  getWordsByCat(cat) {
    return this.http.get(this.url + "word/categories/" + cat)
  }
}
