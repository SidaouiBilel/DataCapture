import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldTypes'
})
export class FieldTypesPipe implements PipeTransform {

  transform(fields: any[], types: string[]): any {
    if (types)
      return fields.filter(f=> types.includes(f.type))
    else
      return fields;
  }

}
