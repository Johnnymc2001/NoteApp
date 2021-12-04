import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag',
})
export class CustomPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    var str = value + '';
    var returnValue = '';
    var splits = str.split(',');
    if (splits.length == 1) returnValue = `#${splits[0]}`;
    else {
      returnValue = `#${splits[0]}`
      splits.shift();
      splits.forEach((spl) => {
        returnValue += ', #' + spl;
      });
    }

    return returnValue;
  }
}
