import { Injectable } from '@angular/core';
import { isNumber } from 'util';

@Injectable()
export class ValidateService {

  constructor() { }

  validateString(string) {
    if(string === '') return false;
    return true;
  }

  validateNumber(number) {
    if(number === undefined){
      return true;
    } else {
      var re = /^\d+$/;
      return re.test(number);
    }
  }

  validateDate(date) {
    if(date === undefined || date === ''){
      return true;
    } else {
      var re = /^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/;
      return re.test(date);
    }
  }

  validateArray(array) {
    if(array.length == 0) return false;
    return true;
  }

  validateGameSelect(game) {
    if(game === undefined || game.name == '') return false;
    return true;
  }

  validateRating(rating) {
    if(rating >= 0 && rating <= 10 || rating === undefined) return true;
    return false;
  }
}
