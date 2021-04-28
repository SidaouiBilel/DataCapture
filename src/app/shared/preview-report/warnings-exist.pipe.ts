import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warningsExist'
})
export class WarningsExistPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    let result = false
    items.forEach(item => {
      if(item.includes(filter)) {
        result = true
        return
      }
    })
    return result
  }
}

