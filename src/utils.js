'use strict';

const MONTHS_RANGE = 3; // дата в пределах трех месяцев

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCurrentDate = () => {
  return new Date();
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomDateInRange = () => {
  const currentDate = getCurrentDate();
  const startDate = getCurrentDate();
  startDate.setMonth(startDate.getMonth() - MONTHS_RANGE);
  return getRandomDate(startDate, currentDate);
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const shuffle = (array) => {
  let someArray = array.slice();
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomArray = (array) => {
  const randomLength = getRandomInt(1, array.length - 1);
  const randomArray = shuffle(array);
  return randomArray.slice(0, randomLength);
};

const getShuffledArray = (array, size) => {
  return shuffle(array).slice(1, size);
};

module.exports = {
  getShuffledArray,
  getRandomInt,
  getRandomArray,
  getRandomArrayElement,
  getRandomDateInRange,
};
