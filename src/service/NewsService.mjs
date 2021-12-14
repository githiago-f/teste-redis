import { cli, newsIndex, newsList } from '../config/index.mjs';
import chalk from 'chalk';

export const printNews = (news) => {
  for (const n of news) {
    console.log(chalk.blue(n));
  }
}

export const createNews = async (title, body) => {
  console.log('createNews');
  await cli.connect();

  const id = await cli.incr(newsIndex);
  const news = JSON.stringify({
    id,
    titulo: title,
    corpo: body,
    createdAt: (new Date()).toLocaleDateString('pt-BR')
  });

  console.log(chalk.green(`Notícia inserida: ${news}`));

  await cli.lPush(newsList, news);
  await cli.lTrim(newsList, 0, 4);

  await cli.disconnect();
}

export const listNews = async () => {
  await cli.connect();
  const news = await cli.lRange(newsList, 0, 4);
  printNews(news);
  await cli.disconnect();
}