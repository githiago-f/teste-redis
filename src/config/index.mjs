import redis from 'redis';

export const newsList = 'last-news';
export const newsIndex = 'news-index';
export const cli = redis.createClient({
  password: 'Redis2019!'
});
