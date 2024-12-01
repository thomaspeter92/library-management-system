import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitSemi',
})
export class SplitSemicolonPipe implements PipeTransform {
  transform(value: string, length?: number) {
    if (!value) return;
    const formatted = value.split(';').join(', ');
    if (length) {
      return (
        formatted.substring(0, length) + (value.length > length ? '...' : '')
      );
    }
    return formatted;
  }
}
