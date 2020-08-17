import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private http: HttpClient) {
  }

  getTargetFields(domainId: string) {
    return this.http.get( environment.admin + `domain/${domainId}/fields`);
  }

  getPreviouslyMappings(domainId: string) {
    return this.http.get( environment.mapping + `/previous-mappings/${domainId}`);
  }

  getMappingById(domainId: string, SheetId: string, mappingId: string) {
    return this.http.get(environment.mapping + `/apply?file=${SheetId}&domainId=${domainId}&name=${name}&mappingId=${mappingId}`);
  }

  updateMapping(targets: any[], mappingId: string, sheetId: string, domainId: string) {
    return this.http.post(environment.mapping + '/', this.getMappingBody(targets, mappingId, sheetId, domainId));
  }

  getAutomaticMapping(domainId: string, SheetId: string, name: string): Observable<any> {
    return this.http.get(environment.mapping + `/?file=${SheetId}&domainId=${domainId}&name=${name}`);
  }

  private getMappingBody(targets: any[], mappingId: string, sheetId: string, domainId: string): any {
    return {
      file: sheetId,
      mapping_id: mappingId,
      domainId,
      mapping: targets.map(t => {if (t.value) { return {source: [t.value], target: t.name}; }}).filter((e) => {if(e) { return e; }})
    };
  }
}
