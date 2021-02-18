import { MicroRoutingService , MICRO_APP_NAME , MICRO_EVENT } from './micro-routing.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MicroRoutingModule { 
    static forRoot(microapp :string , microeventname :string) :ModuleWithProviders<MicroRoutingModule>{
      return{
        ngModule:MicroRoutingModule,
        providers: [MicroRoutingService, 
                    {provide: MICRO_APP_NAME, useValue: microapp },
                    {provide: MICRO_EVENT, useValue: microeventname}]
      };
    }
    constructor(private micror_S : MicroRoutingService){
      this.micror_S.initRouting();
    }

}
