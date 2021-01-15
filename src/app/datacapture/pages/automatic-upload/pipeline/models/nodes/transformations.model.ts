import { Filter, FilterAndReplace, Merge, Replace, DeleteRow, DefaultValue, Splitter, Calculator, FormatDate, GroupBy, Hasher } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { CustomIconsService } from "@app/shared/services/custom-icons.service";
import { ServiceLocator } from "@app/shared/utils/injector.utils";

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
}
export class NodeTransformationFilterAndReplace extends NodeTransformations{
    static transformer = FilterAndReplace;
}
export class NodeTransformationMerge extends NodeTransformations{
    static transformer = Merge
}
export class NodeTransformationReplace extends NodeTransformations{
    static transformer = Replace;
}
export class NodeTransformationDeleteRow extends NodeTransformations{
    static transformer = DeleteRow;
}
export class NodeTransformationDefaultValue extends NodeTransformations{
    static transformer = DefaultValue;
}
export class NodeTransformationSplitter extends NodeTransformations{
    static transformer = Splitter;
}
export class NodeTransformationCalculator extends NodeTransformations{
    static transformer = Calculator;
}
export class NodeTransformationFormatDate extends NodeTransformations{
    static transformer = FormatDate;
}
export class NodeTransformationGroupBy extends NodeTransformations{
    static transformer = GroupBy;
}
export class NodeTransformationHash extends NodeTransformations{
    static transformer = Hasher;
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
    cls.nzicon = new cls.transformer().icon
}