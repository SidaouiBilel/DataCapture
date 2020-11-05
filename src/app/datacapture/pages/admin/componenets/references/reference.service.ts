import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  ReferenceDataImport(activeRefType: any): any {
    return `${environment.admin}domain/reference_data/${activeRefType.id}/import`
  }

  constructor(private http: HttpClient) { }

  referenceType=[]
  references = []

  getReferenceTypesByCollection(collection_id){
    return this.http.get(`${environment.admin}reference/type${collection_id?`?domain_id=${collection_id}`:''}`)
  }

  getReferenceTypesById(ref_type_id){
    return this.http.get(`${environment.admin}reference/type/${ref_type_id}`)
  }

  saveReferenceType(refType){
    return this.http.post(`${environment.admin}reference/type`, refType)
  }

  getReferenceDataByType(referenceTypeId){
    return this.http.get(`${environment.admin}reference/type/${referenceTypeId}/data`)
  }

  saveReferenceData(refData){
    return this.http.post(`${environment.admin}reference/type/${refData.ref_type_id}/data`, refData)
  }

  deleteReferenceData(refData){
    return this.http.delete(`${environment.admin}reference/data/${refData.id}`)
  }

  deleteReferenceType(refType){
    return this.http.delete(`${environment.admin}reference/type/${refType.id}`)
  }

  getSimple(collection_id){
    return this.getReferenceTypesByCollection(collection_id).pipe(
      map((list:any[])=>list.map(e=>({value:e.id, label:e.label})))
    )
  }

  shareReferenceType(ref_type_id: any, defaultCheckedKeys: any[]) {
    return this.http.post(`${environment.admin}reference/type/${ref_type_id}/share`, {domain_ids: defaultCheckedKeys})
  }
  
}
