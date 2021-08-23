import { ComparisonCheck, CustomCheck, FormatCheck, LimitCheck, LookForCheck, ReferenceCheck } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/checks.model";
import { CompareWithComponent } from "./compare-with/compare-with.component";
import { FormatCheckComponent } from "./format-check/format-check.component";
import { LimitCheckComponent } from "./limit-check/limit-check.component";
import { LookInComponent } from "./look-in/look-in.component";

export const CHECKS = [
  new LimitCheck().setComponent(LimitCheckComponent),
  new LookForCheck().setComponent(LookInComponent),
  new ReferenceCheck(),
  new FormatCheck().setComponent(FormatCheckComponent),
  new ComparisonCheck().setComponent(CompareWithComponent),
  new CustomCheck(),
];

export const CheckFactory = (type) => {
  return CHECKS.find(t => t.type === type);
};


