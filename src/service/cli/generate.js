'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  getRandomDateInRange,
  getRandomArrayElement,
  getRandomArray,
  getShuffledArray,
  getRandomInt,

} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES = `./data/sentences.txt`;
const FILE_TITLES = `./data/titles.txt`;
const FILE_CATEGORIES = `./data/categories.txt`;


const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, [sentences, titles, categories]) => (
  Array.from({length: count}, () =>
    ({
      title: getRandomArrayElement(titles),
      createdDate: getRandomDateInRange(),
      announce: getShuffledArray(sentences, getRandomInt(1, 5)).join(` `),
      fullText: getShuffledArray(sentences, getRandomInt(1, sentences.length)).join(` `),
      category: getRandomArray(categories),
    }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > 1000) {
      console.error(`Не больше 1000 публикаций`);
      return;
    }
    const data = await Promise.all([readContent(FILE_SENTENCES), readContent(FILE_TITLES), readContent(FILE_CATEGORIES)]);
    const content = JSON.stringify(generateOffers(countOffer, data));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
