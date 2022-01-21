
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
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ];
}

export class NodeMap extends PipelineNode{
    static type = 'map'
    static category = 'TRANSFORMATION'    
    static nzicon = "rotate-left"
    static color = 'darkorange';
    static label = 'Map'
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}

export class NodeSelect extends PipelineNode{
    static type = 'select'
    static category = 'TRANSFORMATION'    
    static nzicon = "select"
    static color = 'darkorange';
    static label = 'Select'
    static ports = [
        {id:"INPUT",spot: go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}
