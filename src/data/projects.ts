export interface LendosProject {
  name: string;
  url: string;
  desc: string;
  image?: string;
}

export interface Project {
  id: string;
  tag: string;
  label: string;
  accentLabel?: string;
  title: string;
  desc: string;
  philosophy?: string[];
  list: [string, string][];
  lendosProjects?: LendosProject[];
  worksUrl?: string;
  worksText?: string;
  cta: string;
  ctaText: string;
  mockup?: boolean;
  image?: string;
  badge?: 'Live' | 'Coming soon';
  sublabel?: string;
}

export const lendosProjects: LendosProject[] = [
  {
    name: 'YHYAQ Danang',
    url: 'https://iindev-solutions.github.io/yhyaq-danang/',
    desc: 'Ысыах в Дананге - туристический лендинг',
    image: '/assets/works/yhyaq-danang.png',
  },
  {
    name: 'meinekiene',
    url: 'https://iindev.codeberg.page/mienekiene/',
    desc: 'Портфолио фотографа',
  },
  {
    name: 'AUTOBARON',
    url: 'https://iindev.codeberg.page/autobaron/',
    desc: 'Авто под бюджет с доставкой по РФ',
  },
  {
    name: 'ВинСтрой',
    url: 'https://iindev.codeberg.page/vinstroy/',
    desc: 'Строительство частных домов в Якутии',
  },
  {
    name: 'OmuqAuto',
    url: 'https://iindev.codeberg.page/omuq_auto/',
    desc: 'Авто из Японии и Кореи под заказ в Якутске',
  },
];

export const projects: Project[] = [
  {
    id: 'lendos',
    tag: 'Live',
    label: 'lendos',
    accentLabel: 'iindev',
    title: 'iindev lendos',
    desc: 'От 30К за лендинг - норма рынка. Мы сломали формат. Делаем сайт из ваших данных, даём демо, вы сами называете цену. Никаких обязательств до результата.',
    philosophy: [
      'Студии берут предоплату за обещание. Мы берём оплату за результат.',
      'Сначала делаем. Потом вы решаете, сколько это стоит. Если не стоит - не платите.',
      'Это не щедрость. Это стандарт, до которого рынок ещё не дошёл.',
    ],
    list: [
      ['Данные', 'Из ваших соцсетей и карт'],
      ['Демо', 'Временно размещаем бесплатно'],
      ['Оплата', 'Любая сумма'],
      ['Домен', 'Вы покупаете'],
      ['Код', 'Полностью ваш'],
    ],
    lendosProjects,
    worksUrl: '/works/lendos/',
    worksText: 'Смотреть работы',
    cta: '/works/lendos/',
    ctaText: 'Смотреть работы',
    mockup: true,
    badge: 'Live',
    sublabel: 'Лендинг. Любой прайс.',
  },
  {
    id: 'sakha',
    tag: 'Live',
    label: 'Алфавит Новгородова',
    title: 'Саха Алфавит Новгородова',
    desc: 'Транслитератор саха тыла из кириллицы в алфавит С.А. Новгородова (1917). Интерактивный веб-инструмент для работы с якутским латинским алфавитом.',
    list: [
      ['Тип', 'Веб-инструмент'],
      ['Язык', 'Саха тыла / Якутский'],
      ['Технология', 'Vanilla JS'],
      ['Алфавит', 'Новгородов 1917'],
      ['Код', 'Открытый'],
    ],
    image: '/assets/works/novgorodov-alphabet.png',
    cta: 'https://iindev-solutions.github.io/sakha-alphabet-novgorodov/',
    ctaText: 'Открыть проект',
    badge: 'Live',
    sublabel: 'Транслитератор. Саха тыла.',
  },
];

