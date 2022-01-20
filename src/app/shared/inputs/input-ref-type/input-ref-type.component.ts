import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '@app/datacapture/pages/admin/componenets/references/reference.service';
import { MakeProvider, AbstractValueAccessor } from '@app/datacapture/pages/upload/components/transformation/shared/abstarct.accessor';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-input-ref-type',
  templateUrl: './input-ref-type.component.html',
  styleUrls: ['./input-ref-type.component.css'],
  providers: [MakeProvider(InputRefTypeComponent)]
})
export class InputRefTypeComponent extends AbstractValueAccessor implements OnInit {

  list$ = new BehaviorSubject([])
  open = false

  loading$ = new BehaviorSubject(false)
  
  constructor(private service:ReferenceService) { 
    super()
  }

  ngOnInit() {
  }


  onOpenChange(open){
    if (open) {
      this.open = true
      this.onOpen()
    } else {
      this.open = false
    }
  }

  onOpen(){
    this.reset();
    this.loading$.next(true);
    of(null).pipe(
      switchMap((colID)=>this.service.getSimple(colID)),
      tap((fileds:any[])=> this.list$.next(fileds)),
      tap(()=> this.loading$.next(false),
      // catchError(()=>{this.reset(); return null})
      )
      ).subscribe()
  }

  reset(){
    this.loading$.next(false)
    this.list$.next(null)
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

}
