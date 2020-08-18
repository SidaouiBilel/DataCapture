import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivePipe, selectActivePipeId, selectTransformedFilePath } from '../../../transformation/store/transformation.selectors';
import { selectFileMetaData } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { AppState } from '@app/core';
import { merge, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { PreMappingTransformationService } from '@app/datacapture/pages/upload/services/pre-mapping-transformation.service';
import { TRANSFORMATIONS } from '../../../transformation/transformations/transformers';
import { TranformationService } from '../../../transformation/services/tranformation.service';

@Component({
  selector: 'app-target-preview',
  templateUrl: './target-preview.component.html',
  styleUrls: ['./target-preview.component.css']
})
export class TargetPreviewComponent implements OnInit, OnDestroy {

  // DECLARATIONS
  fileData$;
  activePipe$;
  selectedSheet$;

  // SUBSCRIPTIONS
  paginator$;

  // TABLE DATA
  headers$ = new BehaviorSubject<any>(null)
  totalRecords$ = new Subject<any>()

  // METADATA
  error$ = new BehaviorSubject<string>(null)
  loading$ = new BehaviorSubject<boolean>(false)
  page$ = new BehaviorSubject<number>(1)
  size$ = new BehaviorSubject<number>(25)
  generatedFileId$;
  gridReady$ = new Subject<string>();

  constructor(
    private store: Store<AppState>,
    private service: PreMappingTransformationService,
    private transformService: TranformationService
    ) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet)
    this.fileData$ = this.store.select(selectFileMetaData)
    this.generatedFileId$ = this.store.select(selectTransformedFilePath)
    this.activePipe$ = this.store.select(selectActivePipe)
  }
  ngOnDestroy(): void {
    this.paginator$.unsubscribe()
  }

  ngOnInit() {

    // LISTEN FOR PAGINATION OR FILE CHANGES
    this.paginator$ = combineLatest(this.generatedFileId$, this.page$, this.gridReady$, this.size$).subscribe(
      ([fileid, page, gridApi, size]:any)=>{
        this.onReset()
        if ( fileid && page ){
          // REFRESH GRID IN HERE
          this.generateDataSource(fileid, page, size, gridApi)
        } else {
          this.onError('MISSING PARAMETER')
        }
      }
    )
  }

  onError = (err)=>{
    this.headers$.next(null)
    this.loading$.next(false)
    this.error$.next(err)
  }

  onReset = () =>{
    this.error$.next(null)
    this.headers$.next(null)
    this.loading$.next(false)
  }
  generateDataSource(fileid, page, size,gridApi) {
    const that = this;
    gridApi.api.setServerSideDatasource({
      getRows(params) {
        let page = params.request.endRow / size;
        that.loading$.next(true)
        that.service.getResult(fileid, page, size).subscribe((res:any) => {
          that.loading$.next(false)
          if(page <= 1){
            that.totalRecords$.next(res.total)
            that.headers$.next(res.headers.map(h=>({field:h})))
          }
          const lastRow = () =>  (page <= res.last_page - 2)? -1: res.total
          params.successCallback(res.data, lastRow()); 
        }, (error) => {
          params.failCallback();
          that.onError(error)
        });
        }
    })
  }

  addTransformer = (transformer, params)=>{
    console.log({params})
    const rule = transformer.getRuleFromGrid(params)
    this.transformService.addTransformaion(rule)
  }

  stringToHTML (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body as HTMLElement;
  };

  getContextMenuItems = (params) => {
    const that = this;
    const trans = TRANSFORMATIONS.map(t=>({
      name: t.label,
      tooltip: t.description,
      action: () => {
        that.addTransformer(t, params)
      },
      // icon: this.icon
    }))

    var result = [
    {
      disabled: true,
      name: 'Transformations',  
      // icon: this.icon
    },
    ...trans,
    'separator',
    'copy',
    'paste',
    'separator',
    'export',
    ];
    return result;
  }

  icon = `<i class="anticon"><svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" data-icon="scissor" aria-hidden="true"><path d="M567.1 512l318.5-319.3c5-5 1.5-13.7-5.6-13.7h-90.5c-2.1 0-4.2.8-5.6 2.3l-273.3 274-90.2-90.5c12.5-22.1 19.7-47.6 19.7-74.8 0-83.9-68.1-152-152-152s-152 68.1-152 152 68.1 152 152 152c27.7 0 53.6-7.4 75.9-20.3l90 90.3-90.1 90.3A151.04 151.04 0 00288 582c-83.9 0-152 68.1-152 152s68.1 152 152 152 152-68.1 152-152c0-27.2-7.2-52.7-19.7-74.8l90.2-90.5 273.3 274c1.5 1.5 3.5 2.3 5.6 2.3H880c7.1 0 10.7-8.6 5.6-13.7L567.1 512zM288 370c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80zm0 444c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg></i>`

}
