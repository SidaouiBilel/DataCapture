import { FormatterComponent } from './transformation-interface/format/formatter/formatter.component';
import { MergerComponent } from './transformation-interface/format/merger/merger.component';
import { DeleteRowsComponent } from './transformation-interface/format/delete-rows/delete-rows.component';
import { DeleteColumnComponent } from './transformation-interface/format/delete-column/delete-column.component';

export const TRANSFORMATIONS = [
    { type: 'delete-rows', label: 'Delete Rows', icon: 'scissor', component: DeleteRowsComponent},
    { type: 'delete-column', label: 'Delete Column', icon: 'scissor', icon_rotation: 90 , component: DeleteColumnComponent},
    { type: 'replace', label: 'Replace' , icon: 'font-size', component: FormatterComponent},
    { type: 'merge', label: 'Merge' , icon:'link', component: MergerComponent}
  ]; 