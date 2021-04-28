import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warningsFilter'
})
export class WarningsFilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.includes(filter) == true);
  }

}
