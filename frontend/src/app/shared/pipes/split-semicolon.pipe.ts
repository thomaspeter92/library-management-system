import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitSemi',
})
export class SplitSemicolonPipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return value.split(';').join(', ');
  }
}
