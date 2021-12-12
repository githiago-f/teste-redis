import { cli, newsIndex, newsList } from './config.js';
import chalk from 'chalk';

export const createNews = async (title, body) => {
  await cli.connect();

  const id = await cli.incr(newsIndex);
  const news = JSON.stringify({
    id, 
    titulo: title,
    corpo: body
  });
  await cli.lPush(newsList, news);
  await cli.lTrim(newsList, 0, 4);

  await cli.disconnect();
}

export const printNews = (news) => {
  for (const n of news) {
    console.log(chalk.bgGreen(n));
  }
}

export const listNews = async () => {
  await cli.connect();
  const news = await cli.lRange(newsList, 0, 4);
  printNews(news);
  await cli.disconnect();
}