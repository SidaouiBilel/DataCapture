import { Filter, FilterAndReplace, Merge, Replace, DeleteRow, DefaultValue, Splitter, Calculator, FormatDate, GroupBy, Hasher } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { NodeCalculcatorComponent } from "@app/shared/setup/nodes/transformations/node-calculcator-component/node-calculcator-component.component";
import { NodeDefaultComponent } from "@app/shared/setup/nodes/transformations/node-default-component/node-default-component.component";
import { NodeDeleteRowComponent } from "@app/shared/setup/nodes/transformations/node-delete-row-component/node-delete-row-component.component";
import { NodeFilterReplaceComponent } from "@app/shared/setup/nodes/transformations/node-filer-replace-component/node-filer-replace-component.component";
import { NodeFilterComponent } from "@app/shared/setup/nodes/transformations/node-filter-component/node-filter-component.component";
import { NodeFormatDateComponent } from "@app/shared/setup/nodes/transformations/node-format-date-component/node-format-date-component.component";
import { NodeGroupbyComponent } from "@app/shared/setup/nodes/transformations/node-groupby-component/node-groupby-component.component";
import { NodeHashComponent } from "@app/shared/setup/nodes/transformations/node-hash-component/node-hash-component.component";
import { NodeMergeComponent } from "@app/shared/setup/nodes/transformations/node-merge-component/node-merge-component.component";
import { NodeReplaceComponent } from "@app/shared/setup/nodes/transformations/node-replace-component/node-replace-component.component";
import { NodeSplitterComponent } from "@app/shared/setup/nodes/transformations/node-splitter-component/node-splitter-component.component";

import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeTransformations extends PipelineNode{
    static type = 'TRANSFORMATION'
    static category = 'TRANSFORMATION'
    
    static background = 'white';
    static label = 'Generic Transformation'
    static ports = [
        {id:"INPUT", spot:go.Spot.LeftCenter},
        {id:"OUTPUT", spot:go.Spot.RightCenter},
    ]
    static transformer: any = null
}

// TODO IMPLEMENT COMPONENETS FOR EACH TRANSFORMATION
export class NodeTransformationFilter extends NodeTransformations{
    static transformer = Filter;
    static component = NodeFilterComponent;
}
export class NodeTransformationFilterAndReplace extends NodeTransformations{
    static transformer = FilterAndReplace;
    static component = NodeFilterReplaceComponent;
}
export class NodeTransformationMerge extends NodeTransformations{
    static transformer = Merge
    static component = NodeMergeComponent;
}
export class NodeTransformationReplace extends NodeTransformations{
    static transformer = Replace;
    static component = NodeReplaceComponent;
}
export class NodeTransformationDeleteRow extends NodeTransformations{
    static transformer = DeleteRow;
    static component = NodeDeleteRowComponent;
}
export class NodeTransformationDefaultValue extends NodeTransformations{
    static transformer = DefaultValue;
    static component = NodeDefaultComponent;
}
export class NodeTransformationSplitter extends NodeTransformations{
    static transformer = Splitter;
    static component = NodeSplitterComponent;
}
export class NodeTransformationCalculator extends NodeTransformations{
    static transformer = Calculator;
    static component = NodeCalculcatorComponent;
}
export class NodeTransformationFormatDate extends NodeTransformations{
    static transformer = FormatDate;
    static component = NodeFormatDateComponent;
}
export class NodeTransformationGroupBy extends NodeTransformations{
    static transformer = GroupBy;
    static component = NodeGroupbyComponent;
}
export class NodeTransformationHash extends NodeTransformations{
    static transformer = Hasher;
    static component = NodeHashComponent;
}

for (let cls of [
    NodeTransformationFilter,
    NodeTransformationFilterAndReplace,
    NodeTransformationMerge,
    NodeTransformationReplace,
    NodeTransformationDeleteRow,
    NodeTransformationDefaultValue,
    NodeTransformationSplitter,
    NodeTransformationCalculator,
    NodeTransformationFormatDate,
    NodeTransformationGroupBy,
    NodeTransformationHash
]){
    const t = new cls.transformer()
    cls.type = t.type
    cls.label = t.label
    cls.nzicon = t.icon
}