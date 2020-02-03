"use strict";

const form = document.querySelector('.form');
const button = document.querySelector('.button');
const revers = document.querySelector('.revers');
let error = document.querySelector('.error');
let rezult = document.querySelector('.rezult');
let rezultText = document.querySelector('.rezult-text');
let rezultImg = document.querySelector('.rezult-img');

//Ф-ия для ТОЛЬКО цифр
function selectKey( event ) {
  if ( !event.code ) return;
  if ( event.repeat ) event.preventDefault();
  const keyArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const keySuperArray = ['Enter', 'Delete', 'Backspace', 'Tab', 'Shift'];

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

  if ( event.key === '.' || event.key === ',' ) control = true;

  if ( control === false ) {
    event.preventDefault();
  }
}

// Ф-ия преобразования строки в число
function forNumber( str ) {
  str = str.replace( ',' , '.' );
  str = Number( str );
  if (!str) {
    error.style.display = 'block';
    return false;
  };
  return str;
}

// Ф-ия вывода результата
function rezultOut ( text, src ) {
  rezultText.textContent = text;
  rezultImg.src = src;
  rezultImg.alt = `Фигура ${text}`;
  form.style.display = 'none';
}

// Ф-ия подсчета фигуры
function calc( event ) {
  event.preventDefault();
  error.style.display = 'none';
  rezult.style.display = 'none';
  let breast = forNumber( form[0].value ); //Грудь
  let waist = forNumber( form[1].value ); //Талия
  let hips = forNumber( form[2].value ); //Бедра

  if ( breast && waist && hips ) { rezult.style.display = 'block' }
  else { return } ;

  if ( Math.abs( breast - hips ) <= 5 &&  hips - waist >= 20 ) {
    rezultOut ( 'Песочные часы', './img/hourglass.jpg' );
  }
    else if ( Math.abs( breast - hips ) <= 5 &&  hips - waist < 20  &&  hips - waist > 5) {
    rezultOut ( 'Прямоугольник', './img/rect.jpg' );
  }
    else if ( hips - breast > 5 ) {
    rezultOut ( 'Треугольник', './img/triangle.jpg' );
  }
    else if ( breast - hips > 5 ) {
    rezultOut ( 'Перевернутый треугольник', './img/triangle_rew.jpg' );
  }
    else if ( Math.abs( breast - hips ) <= 5 && Math.abs( breast - waist ) <= 5 && Math.abs( hips - waist ) <= 5 ) {
    rezultOut ( 'Круг', './img/oval.jpg' );
  }
    else {
    rezultOut ( 'Ваша фигура, этой программой не предусмотрена, обратитесь к учителю', './img/cat.jpg' );
  }
}

for (let item of form ) {
  if ( item.type === 'text' ) {
    item.addEventListener( 'keypress', selectKey );
  };
};

form.addEventListener( 'submit', calc );
revers.addEventListener( 'click', () => { location.reload(); });
