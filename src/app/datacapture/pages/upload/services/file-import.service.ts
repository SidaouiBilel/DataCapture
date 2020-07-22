import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get( environment.admin + 'domain/');
  }

  getTargetFields(domainId: string) {
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  public getFileData(page: number, worksheet: string, nrows: number): Observable<any> {
    const params = new HttpParams()
    .set('page', page + '')
    .set('lob', 0 + '')
    .set('nrows', nrows + '');
    return this.http.get(environment.upload + 'data/' + worksheet, { params });
  }

  public getFileMetaData(fileData: any): Observable<any> {
    const params = new HttpParams()
    .set('filename', fileData.filename.split('.')[0])
    .set('filetype', fileData.filetype)
    .set('page', 1 + '')
    .set('worksheet', 'None') // default value index 1
    .set('nrows', 'None'); // default value 30
    return this.http.get(environment.upload + 'data/' + fileData, { params });
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

