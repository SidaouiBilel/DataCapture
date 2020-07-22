import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) {
  }

  getTargetFields(domainId: string){
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  updateMapping(targets: any[], mappingId: string, sheetId: string, domainId: string) {
    return this.http.post(environment.mapping + '/', this.getMappingBody(targets, mappingId, sheetId, domainId));
  }

  getAutomaticMapping(domainId: string, SheetId: string): Observable<any> {
    return this.http.get(environment.mapping + `/?file=${SheetId}&domainId=${domainId}`);
  }

  private getMappingBody(targets: any[], mappingId: string, sheetId: string, domainId: string): any {
    return {
      file: sheetId,
      mapping_id: mappingId,
      domainId,
      mapping: targets.map(t => ({
        source: [t.value],
        target: t.name,
      }))
    };
  }
}
