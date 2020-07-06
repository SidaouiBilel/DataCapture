import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {}

  // To Do: Refactor add it to Util service and make it generic
  removeDuplicatesFromArray(arr: any[], comp: string): any[] {
    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }
}
