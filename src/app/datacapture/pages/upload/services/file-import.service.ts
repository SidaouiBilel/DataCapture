import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get( environment.admin + 'domain/');
  }

  getAllSuper() {
    return this.http.get( environment.admin + 'domain/all/super');
  }

  getTargetFields(domainId: string) {
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  public getFileData(page: number, worksheet: string, nrows: number): Observable<any> {
    const params = new HttpParams()
    .set('page', page + '')
    .set('lob', 0 + '')
    .set('nrows', nrows + '');
    return this.http.get(environment.import + 'data/' + worksheet, { params });
  }

  public updateRow(filename: string, worksheet: string, worksheetId: string, nrows: number, page: number, num: number[], lines: string[]) {
    return this.http.post('environment.endPoints.upload1' + 'data', {
      filename,
      worksheet,
      worksheet_id: worksheetId,
      nrows,
      page,
      num,
      lines
    });
  }

}

