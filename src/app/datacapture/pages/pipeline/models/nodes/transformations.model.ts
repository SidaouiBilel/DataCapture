import { Filter, FilterAndReplace, Merge, Replace, DeleteRow, DefaultValue, Splitter, Calculator, FormatDate, GroupBy } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";

import * as go from "gojs";
import { PipelineNode } from "../node.model";

export class NodeTransformations extends PipelineNode{
    static type = 'TRANSFORMATION'
    static category = 'TRANSFORMATION'
    static template_name = 'TRANSFORMATION'
    static color = 'grey'
    static label = 'Generic Transformation'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
    static transformer: any = null
    static component = BaseNodeTransformationComponent
}

// TODO IMPLEMENT COMPONENETS FOR EACH TRANSFORMATION
export class NodeTransformationFilter extends NodeTransformations{
    static transformer = Filter
}
export class NodeTransformationFilterAndReplace extends NodeTransformations{
    static transformer = FilterAndReplace
}
export class NodeTransformationMerge extends NodeTransformations{
    static transformer = Merge
}
export class NodeTransformationReplace extends NodeTransformations{
    static transformer = Replace
}
export class NodeTransformationDeleteRow extends NodeTransformations{
    static transformer = DeleteRow
}
export class NodeTransformationDefaultValue extends NodeTransformations{
    static transformer = DefaultValue
}
export class NodeTransformationSplitter extends NodeTransformations{
    static transformer = Splitter
}
export class NodeTransformationCalculator extends NodeTransformations{
    static transformer = Calculator
}
export class NodeTransformationFormatDate extends NodeTransformations{
    static transformer = FormatDate
}
export class NodeTransformationGroupBy extends NodeTransformations{
    static transformer = GroupBy
}

export const NODE_TRANSFORMERS = [
                NodeTransformationFilter
                ,NodeTransformationFilterAndReplace
                ,NodeTransformationMerge
                ,NodeTransformationReplace
                ,NodeTransformationDeleteRow
                ,NodeTransformationDefaultValue
                ,NodeTransformationSplitter
                ,NodeTransformationCalculator
                ,NodeTransformationFormatDate
                ,NodeTransformationGroupBy
            ].map(cls =>{
                const t = new cls.transformer()
                cls.type = t.type
                cls.label = t.label
                cls.template_name = t.type
                return cls
            })