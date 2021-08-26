
import { CustomIconsService } from "@app/shared/services/custom-icons.service";
import { ServiceLocator } from "@app/shared/utils/injector.utils";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeFilterByCategory extends PipelineNode{
    static type = 'filter-category'
    static category = 'Classification'
    static nzicon = "cluster"
    static color = '#2e394b';
    static label = 'Filter By Category'
    static showLabel = false
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]

    public static makeIcon(){
        const i={element: null}
        return  $(go.Picture,  new go.Binding("element", "category", (category,t)=>{
            let nzicon = this.nzicon
            switch(category){
                case 'COM':nzicon='shopping-cart';break;
                case 'PER':nzicon='idcard';break;
                case 'MED':nzicon='medicine-box';break;
                case 'OTH':nzicon='flag';break;
            }
            const iconsService = ServiceLocator.injector.get(CustomIconsService)
            const svg = iconsService.getIconSvgElement(nzicon+'-o')
            return svg
        }), { desiredSize: new go.Size(this.iconSize, this.iconSize), ...i, margin: 8 })
    }
}


export class NodeHashByCategory extends PipelineNode{
  static type = 'hash-by-category'
  static category = 'Classification'
  static nzicon = "cluster"
  static color = '#2e394b';
  static label = 'Hash By Category'
  static showLabel = false
  static ports = [
      {id:"INPUT",spot:go.Spot.Left},
      {id:"OUTPUT",spot:go.Spot.Right},
  ]

  public static makeIcon(){
      const i={element: null}
      return  $(go.Picture,  new go.Binding("element", "category", (category,t)=>{
          let nzicon = this.nzicon
          switch(category){
            case 'MED':nzicon='medicine-box';break;
            case 'PER':nzicon='idcard';break;
            case 'COM':nzicon='shopping-cart';break;
            case 'GEO':nzicon='global';break;
            case 'OTH':nzicon='flag';break;
          }
          const iconsService = ServiceLocator.injector.get(CustomIconsService)
          const svg = iconsService.getIconSvgElement(nzicon+'-o')
          return svg
      }), { desiredSize: new go.Size(this.iconSize, this.iconSize), ...i, margin: 8 })
  }
}


export class NodeCheckRsu extends PipelineNode{
  static type = 'rsu-check'
  static category = 'Classification'
  static nzicon = "file-search"
  static color = '#2e394b';
  static label = 'Check'
  static showLabel = false
  static ports = [
      {id:"INPUT",spot:go.Spot.Left},
      {id:"OUTPUT",spot:go.Spot.Right},
  ]

}

export class NodeCheckSocial extends PipelineNode{
  static type = 'check-social'
  static category = 'Classification'
  static nzicon = "file-search"
  static color = '#2e394b';
  static label = 'check social'
  static showLabel = false
  static ports = [
      {id:"INPUT",spot:go.Spot.Left},
      {id:"OUTPUT",spot:go.Spot.Right},
  ]

}
