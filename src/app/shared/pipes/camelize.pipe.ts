import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'camelize'
})
export class CamelizePipe implements PipeTransform {

  transform(value: any, separator?: any): any {
    return this.camelize(value, separator ? separator : '_');
  }

  /**
   * abc_def/ ABC_DEF => Abc Def
   * Camelize a string, cutting the string by separator character.
   * @param text to camelize
   * @param separator (underscore by default)
   * @return string camelized text
   */
  camelize(text, separator) {
    text = text.toLowerCase();
    // Assume separator is _ if no one has been provided.
    if (typeof(separator) === 'undefined') {
      separator = '_';
    }

    // Cut the string into words
    const words = text.split(separator);

    // Concatenate all capitalized words to get camelized string
    const result = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
      result.push(capitalizedWord);
    }

    return result.join(' ');

  }
}
