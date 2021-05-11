import { LimitCheck, LookForCheck } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/checks.model";
import { LimitCheckComponent } from "./limit-check/limit-check.component";

export const CHECKS = [
  new LimitCheck().setComponent(LimitCheckComponent),
  new LookForCheck()
];

export const CheckFactory = (type) => {
  return CHECKS.find(t => t.type === type);
};


