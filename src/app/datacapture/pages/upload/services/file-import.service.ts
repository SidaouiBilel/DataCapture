import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {

  constructor(private http: HttpClient) {
  }

  public updateRow(filename: string, worksheet: string, worksheet_id: string, nrows: number, page: number, num: number[], lines: string[]) {
    return this.http.post('environment.endPoints.upload1' + 'data', {
      filename,
      worksheet,
      worksheet_id,
      nrows,
      page,
      num,
      lines
    });
  }

}

