import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { TransformationInterfaceComponent } from '../transformations/transformation-interface/transformation-interface.component';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { DeleteTransNode } from '../store/transformation.actions';
import { TRANSFORMATIONS } from '../transformations/transformers';

@Component({
  selector: 'app-transformation-node',
  templateUrl: './transformation-node.component.html',
  styleUrls: ['./transformation-node.component.css']
})
export class TransformationNodeComponent implements OnInit {

  @Output() changeOrder = new EventEmitter<number>()
  @Output() delete = new EventEmitter()

  @ViewChild('paramsHost', {static: true, read: ViewContainerRef}) paramsHost: ViewContainerRef;
  transformationComponent: TransformationInterfaceComponent

  transofrmation

  params
  @Input() index
  @Input("params") set _params(value){
    this.params = {...value}
    this.updateTransformation()
    this.loadComponent();
  }  

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>) { }

  ngOnInit() {
  }

  updateTransformation(){
    if (this.params && this.params.type){
      for (let t of TRANSFORMATIONS){
        if (t.type == this.params.type){
          this.transofrmation = t

          break
        }
      }
    }
  }

  loadComponent() {
    if (this.transofrmation){

      const component = this.transofrmation.component || TransformationInterfaceComponent
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

      const viewContainerRef = this.paramsHost;

      // viewContainerRef.clear();

      const transformationRef = viewContainerRef.createComponent(componentFactory);
      this.transformationComponent = (<TransformationInterfaceComponent>transformationRef.instance)

      this.transformationComponent.data = this.params;
      this.transformationComponent.validationStatus.subscribe(valid=>{
        console.log(valid)
        this.params.valid = true
      })
      this.transformationComponent.validate()
    }
  }

  onDelete(){
    this.store.dispatch(new DeleteTransNode(this.index))
  }
}
