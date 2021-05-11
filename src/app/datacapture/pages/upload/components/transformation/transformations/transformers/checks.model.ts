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
