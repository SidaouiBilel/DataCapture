
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeConcat extends PipelineNode{
    static type = 'concat'
    static category = 'MERGE'
    static nzicon = "insert-row-below"
    static color = 'orange';
    static label = 'Concat'
    static ports = [
        {id:"INPUT",spot:new go.Spot(0.1,0.2)},
        {id:"CONCAT",spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeTransformationPipeline extends PipelineNode{
    static type = 'PIPELINE_TRANSFORMATION'
    static category = 'TRANSFORMATION'
    static nzicon = "api"
    static color = 'darkorange';
    static label = 'Pipeline'
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeJoin extends PipelineNode{
    static type = 'join'
    static category = 'MERGE'
    static nzicon = "link"
    static color = 'orange';
    static label = 'Join'
    static ports = [
        {id:"INPUT",spot: new go.Spot(0.1,0.2)},
        {id:"JOIN", spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.RightCenter},
    ]
}

export class NodePycode extends PipelineNode{
    static type = 'pycode';
    static category = 'SCRIPTS';

    static icon = 'assets/images/svg/pycode.svg';
    static color = 'red';
    static label = 'Pycode'
    static ports = [
        // {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ];

    public static makePorts(){
        return [...super.makePorts(),
            // created for each item in the itemArray, bound to data.leftArray
            $(go.Panel, "Vertical",
          new go.Binding("itemArray", "inputs"),
          {
            row: 1, column: 0,
            alignment: go.Spot.Left,
            itemTemplate:
              $(go.Panel,
                {
                  _side: "left",  // internal property to make it easier to tell which side it's on
                //   fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
                  fromLinkable: true, toLinkable: true, cursor: "pointer",
                  alignment: go.Spot.Left,
                },
                new go.Binding("portId", "portId"),
                $(go.Shape, 'Circle',
                {
                    strokeWidth: 2,
                    stroke:"white",
                    desiredSize: new go.Size(10,10),
                    alignment: go.Spot.Left,
                },
                this.runBinding('fill')
                )
              )  // end itemTemplate
          }
        ),  // end Vertical Panel
            ]

        }
}


export class NodeCorrelation extends PipelineNode{
  static type = 'correlation'
  static category = 'SCRIPTS'
  static nzicon = "calculator"
  static color = 'darkorange';
  static label = 'Correlation'
  static ports = [
      {id:"INPUT",spot: go.Spot.Left},
      // {id:"OUTPUT",spot:go.Spot.Right},
  ]
}

export class NodeStatistics extends PipelineNode{
  static type = 'statistics'
  static category = 'SCRIPTS'
  static nzicon = "stock"
  static color = 'darkorange';
  static label = 'statistics'
  static ports = [
      {id:"INPUT",spot: go.Spot.Left},
      // {id:"OUTPUT",spot:go.Spot.Right},
  ]
}
