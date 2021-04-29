import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppState } from '@app/core';
import { UpdateTransformationNode } from '@app/datacapture/pages/manual-upload/store/actions/transformation.actions';
import { selectTranformationNodeStatus } from '@app/datacapture/pages/upload/components/transformation/store/transformation.selectors';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { TRANSFORMATIONS } from '../transformations/transformers';
import { TransformationInterfaceComponent } from '../transformations/trasnformation-intefrace/transformation-interface.component';

@Component({
  selector: 'app-transformation-node',
  templateUrl: './transformation-node.component.html',
  styleUrls: ['./transformation-node.component.css']
})
export class TransformationNodeComponent implements OnInit {

  @ViewChild('paramsHost', { static: true, read: ViewContainerRef }) paramsHost: ViewContainerRef;

  transformationComponent: TransformationInterfaceComponent;


  transofrmation

  expanded$ = new BehaviorSubject(false)

  params
  status$
  index
  @Input('index') set _index(value) {
    this.index = value
    // this.status$ = this.store.select(selectTranformationNodeStatus(this.index))
  }
  @Input("params") set _params(value) {
    this.params = JSON.parse(JSON.stringify(value))
    this.updateTransformation()
    this.loadComponent();
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  updateTransformation() {
    if (this.params && this.params.type) {
      for (let t of TRANSFORMATIONS) {
        if (t.type == this.params.type) {
          this.transofrmation = t;
          break;
        }
      }
    }
  }

  loadComponent() {
    if (this.transofrmation) {

      const component = this.getTranformerComponent()
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

      const viewContainerRef = this.paramsHost;

      const transformationRef = viewContainerRef.createComponent(componentFactory);
      this.transformationComponent = (transformationRef.instance) as TransformationInterfaceComponent;

      this.transformationComponent.data = this.params;
      this.transformationComponent.index = this.index;
      this.transformationComponent.dataChanged.subscribe(data => this.onDataChanged(data))
    }
  }

  onDataChanged(data) {
    this.store.dispatch(new UpdateTransformationNode(data, this.index))
  }

  getTranformerComponent() {
    const component = this.transofrmation.component || TransformationInterfaceComponent;

    return component;
  }

  onDelete() {
  }

  onChangeOrder(step) {
  }

  showCompAsModal(): void {

  }
}
