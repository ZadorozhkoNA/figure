"use strict";

const form = document.querySelector('.form');
const button = document.querySelector('.button');
let error = document.querySelector('.error');
let rezult = document.querySelector('.rezult');
let rezultText = document.querySelector('.rezult-text');

//Ф-ия для ТОЛЬКО цифр
function selectKey( event ) {
  if ( !event.code ) return;
  if ( event.repeat ) event.preventDefault();
  const keyArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keySuperArray = ['Enter', 'Delete', 'Backspace'];

  let control = false;
  for ( const key of keyArray ) {
    if ( event.code === `Digit${key}` || event.code === `Numpad${key}` ) {
      control = true;
      break;
    }
  }
  for ( const key of keySuperArray ) {
    if ( event.code === key ) {
      control = true;
      break;
    }
  }

  if ( control === false ) {
    event.preventDefault();
  }
}

// Ф-ия преобразования строки в число
function forNumber( str ) {
  str = Number( str );
  if (!str) {
    error.style.display = 'block';
    return NaN;
  };
  return str;
}


// Ф-ия подсчета фигуры
function calc( event ) {
  error.style.display = 'none';
  rezult.style.display = 'none';
  let breast = forNumber( form[0].value ); //Грудь
  let waist = forNumber( form[1].value ); //Талия
  let hips = forNumber( form[2].value ); //Бедра

  rezult.style.display = 'block';

  if ( Math.abs( breast - hips ) <= 5 &&  hips - waist >= 20 ) {
    rezultText.innerHTML = 'Песочные часы';
  } else if ( Math.abs( breast - hips ) <= 5 &&  hips - waist < 20  &&  hips - waist > 5) {
    rezultText.innerHTML = 'Прямоугольник';
  } else if ( hips - breast > 5 ) {
    rezultText.innerHTML = 'Треугольник';
  } else if ( breast - hips > 5 ) {
    rezultText.innerHTML = 'Перевернутый треугольник';
  } else if ( Math.abs( breast - hips ) <= 5 && Math.abs( breast - waist ) <= 5 && Math.abs( hips - waist ) <= 5 ) {
    rezultText.innerHTML = 'Круг';
  } else {
    rezultText.innerHTML = 'Ваша фигура, этой программой не предусмотрена, обратитесь к учителю';
  }
}

for (let item of form ) {
  if ( item.type === 'text' ) {
    item.addEventListener( 'keydown', selectKey );
  };
};

button.addEventListener( 'click', calc );
