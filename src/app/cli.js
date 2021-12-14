import { program } from 'commander';
import { createNews, listNews } from '../service/NewsService.mjs';

const prog = program;
prog.version('0.0.1');

prog
  .command('cria-noticia')
  .argument('[titulo]', 'Titulo da noticia', 'O titulo é obrigatório')
  .argument('[corpo]', 'Corpo da noticia')
  .action(createNews);

prog
  .command('lista-noticias')
  .action(listNews);

program.parse(process.argv);
