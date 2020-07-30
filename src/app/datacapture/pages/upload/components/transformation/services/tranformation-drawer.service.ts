import { Injectable } from '@angular/core';
import { TransformationPipeComponent } from '../transformation-pipe/transformation-pipe.component';
import { NzDrawerService, NzModalService } from 'ng-zorro-antd';

@Injectable()
export class TranformationDrawerService {

  constructor(
    private drawerService: NzDrawerService, 
    private modalService: NzModalService,
    ) {}
  
  openEditor(type='pre-mapping'){
    const drawerRef = this.drawerService.create<TransformationPipeComponent, { value: string }, string>({
      nzTitle: 'Transformation Pipe',
      nzPlacement: 'bottom',
      nzWrapClassName: 'drawer-wrapper-full-height',
      nzContent: TransformationPipeComponent,
    });
  }
}
