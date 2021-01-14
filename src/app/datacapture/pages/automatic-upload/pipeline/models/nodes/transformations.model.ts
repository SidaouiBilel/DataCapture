import { Filter, FilterAndReplace, Merge, Replace, DeleteRow, DefaultValue, Splitter, Calculator, FormatDate, GroupBy } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
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

    public static makeIcon(){
        const t = new this.transformer()
        const iconsService = ServiceLocator.injector.get(CustomIconsService)
        const svg = iconsService.getIconSvgElement(t.icon+'-o')

        return  $(go.Picture, { desiredSize: new go.Size(24, 24), element: svg, margin: 8 })
    }
}

// TODO IMPLEMENT COMPONENETS FOR EACH TRANSFORMATION
export class NodeTransformationFilter extends NodeTransformations{
    static transformer = Filter
    static icon = "assets/images/svg/filter.svg"
}
export class NodeTransformationFilterAndReplace extends NodeTransformations{
    static transformer = FilterAndReplace;
    static icon = "assets/images/svg/find.svg";
}
export class NodeTransformationMerge extends NodeTransformations{
    static transformer = Merge
    static icon = "assets/images/svg/merge.svg";
}
export class NodeTransformationReplace extends NodeTransformations{
    static transformer = Replace;
    static icon = "assets/images/svg/replace.svg";
}
export class NodeTransformationDeleteRow extends NodeTransformations{
    static transformer = DeleteRow;
    static icon = "assets/images/svg/delete.svg";
}
export class NodeTransformationDefaultValue extends NodeTransformations{
    static transformer = DefaultValue;
    static icon = "assets/images/svg/default.svg";
}
export class NodeTransformationSplitter extends NodeTransformations{
    static transformer = Splitter;
    static icon = "assets/images/svg/split.svg";
}
export class NodeTransformationCalculator extends NodeTransformations{
    static transformer = Calculator;
    static icon = "assets/images/svg/calc.svg";
}
export class NodeTransformationFormatDate extends NodeTransformations{
    static transformer = FormatDate;
    static icon = "assets/images/svg/date.svg";
}
export class NodeTransformationGroupBy extends NodeTransformations{
    static transformer = GroupBy;
    static icon = "assets/images/svg/group.svg";
}