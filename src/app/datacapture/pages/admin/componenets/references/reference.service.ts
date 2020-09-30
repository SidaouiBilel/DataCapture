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
    return this.http.get(`${environment.admin}domain/${collection_id}/reference_type`)
  }

  getReferenceTypesById(ref_type_id){
    return this.http.get(`${environment.admin}domain/${null}/reference_type/${ref_type_id}`)
  }

  getReferenceDataByType(referenceTypeId){
    return this.http.get(`${environment.admin}domain/reference_data/reference_type/${referenceTypeId}`)
  }

  saveReferenceType(refType){
    return this.http.post(`${environment.admin}domain/${null}/reference_type`, refType)
  }

  saveReferenceData(refData){
    return this.http.post(`${environment.admin}domain/reference_data/reference_type/${refData.ref_type_id}`, refData)
  }

  deleteReferenceData(refData){
    return this.http.delete(`${environment.admin}domain/reference_data/${refData.id}`)
  }

  deleteReferenceType(refType){
    return this.http.delete(`${environment.admin}domain/${null}/reference_type/${refType.id}`)
  }

  getSimple(collection_id){
    return this.getReferenceTypesByCollection(collection_id).pipe(
      map((list:any[])=>list.map(e=>({value:e.id, label:e.label})))
    )
  }

}
