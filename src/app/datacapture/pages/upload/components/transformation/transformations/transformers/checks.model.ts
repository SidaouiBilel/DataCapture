import { getPreviousHeader } from '../../shared/utils/transformers.util';
import { isStrEmpty } from '@app/shared/utils/strings.utils';
import { GAPIColumnsInRange, GAPICellValue, GAPSeletedRowRange } from '@app/shared/utils/grid-api.utils';
import { isArrayEmpty } from '@app/shared/utils/arrays.utils';
import { Operation } from './operations.model';

export class Check extends Operation {
  category = 'CHECK'
  color='purple'
}
  
export class LimitCheck extends Check {
  type = 'limit-check';
  label = 'Logic Operator';
  icon = 'right';
}

export class LookForCheck extends Check {
  type = 'look-for';
  label = 'Look For';
  icon = 'search';
}

export class ReferenceCheck extends Check {
  type = 'reference-check';
  label = 'Is Reference';
  icon = 'font-size';
}

export class FormatCheck extends Check {
  type = 'format-check';
  label = 'Format Check';
  icon = 'field-string';
}

export class ComparisonCheck extends Check {
  type = 'comparison-check';
  label = 'Compare';
  icon = 'right';
}

export class CustomCheck extends Check {
  type = 'custom-check';
  label = 'Custom';
  icon = 'code';
}
