import { FormatCheck, ReferenceCheck, LimitCheck, LookForCheck, ComparisonCheck, CustomCheck } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/checks.model";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeDataCheck extends PipelineNode{
    static category = 'DATACHECK'
    static color = 'purple'
    static ports = [
        {id:"INPUT",spot:go.Spot.LeftCenter}, 
        {id:"OUTPUT",spot:go.Spot.RightCenter}
    ]

    // public static makePorts(){
    //     return [...super.makePorts(),
    //         // created for each item in the itemArray, bound to data.leftArray
    //         $(go.Panel, "Vertical",
    //             new go.Binding("itemArray", "inputs"),{
    //                 row: 1, column: 0,
    //                 alignment: go.Spot.Left,
    //                 itemTemplate: $(go.Panel,
    //                     {
    //                     _side: "left",  // internal property to make it easier to tell which side it's on
    //                     //   fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
    //                     fromLinkable: true, toLinkable: true, cursor: "pointer",
    //                     alignment: go.Spot.Left,
    //                     },
    //                     new go.Binding("portId", "portId"),
    //                     $(go.Shape, 'Circle',
    //                     {
    //                         strokeWidth: 2,
    //                         stroke:"white",
    //                         desiredSize: new go.Size(10,10),
    //                         alignment: go.Spot.Left,
    //                     },
    //                     this.runBinding('fill')
    //                     )
    //             )  // end itemTemplate
    //     })]  // end Vertical Panel   
    // }
}


export class NodeDataCheckLimitCheck extends NodeDataCheck{
    static check_class = LimitCheck
}
export class NodeDataCheckLookForCheck extends NodeDataCheck{
    static check_class = LookForCheck
    static ports = [
        {id:"INPUT",spot: new go.Spot(0.1,0.2)},
        {id:"INPUT_1", spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.RightCenter}
    ]

}
export class NodeDataCheckReferenceCheck extends NodeDataCheck{
    static check_class = ReferenceCheck
}
export class NodeDataCheckFormatCheck extends NodeDataCheck{
    static check_class = FormatCheck
}
export class NodeDataCheckComparisonCheck extends NodeDataCheck{
    static check_class = ComparisonCheck
    static ports = [
        {id:"INPUT",spot: new go.Spot(0.1,0.2)},
        {id:"INPUT_1", spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.RightCenter}
    ]
}
export class NodeDataCheckCustomCheck extends NodeDataCheck{
    static check_class = CustomCheck
}


for (let cls of [NodeDataCheckLimitCheck,NodeDataCheckLookForCheck,NodeDataCheckReferenceCheck,NodeDataCheckFormatCheck,NodeDataCheckComparisonCheck,NodeDataCheckCustomCheck]){
    const check = new cls.check_class()
    cls.nzicon = check.icon
    cls.label = check.label
    cls.type = check.type
}