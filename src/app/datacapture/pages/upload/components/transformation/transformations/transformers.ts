import { FormatterComponent } from './transformation-interface/format/formatter/formatter.component';

export const TRANSFORMATIONS = [
    { type: 'delete-lines', label: 'Delete Lines', icon: 'scissor' },
    { type: 'delete-column', label: 'Delete Column', icon: 'scissor' },
    { type: 'format', label: 'Format' , icon: 'font-size', component: FormatterComponent},
    { type: 'merge', label: 'Merge' , icon:'link'},
    { type: 'replace', label: 'Replace', icon: 'sort-ascending' },
  ];