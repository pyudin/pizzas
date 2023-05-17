import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryName',
})
export class CountryNamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    console.log('impure pipe');
    return `${value}-country`;
  }
}
