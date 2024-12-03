import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number) {
    if (!value) return;
    return value.substring(0, length) + (value.length > length ? '...' : '');
  }
}
