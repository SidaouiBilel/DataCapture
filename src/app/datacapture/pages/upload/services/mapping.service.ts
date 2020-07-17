import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) {
  }

  getTargetFields(domainId: string){
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  applyMapping(targets: any[], fileData: any, worksheetIndex: number) {
    return this.http.post(environment.mapping, this.getMappingBody(targets, fileData, worksheetIndex));
  }

  private getMappingBody(targets: any[], fileData: any, worksheetIndex: number): any {
    // console.log(fileData);
    return {
      filename: fileData.metaData.file_id,
      worksheet: fileData.sheets[worksheetIndex],
      worksheet_id: fileData.metaData.worksheets_map[fileData.sheets[worksheetIndex]],
      lob_id: '1',
      mapping: targets.map(t => ({
        source: [t.value],
        target: t.name,
      }))
    };
  }
}
