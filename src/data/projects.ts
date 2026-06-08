export interface Project {
  id: string;
  tag: string;
  title: string;
  desc: string;
  philosophy?: string[];
  list: [string, string][];
  worksUrl?: string;
  worksText?: string;
  cta: string;
  ctaText: string;
  mockup?: boolean;
  badge?: 'Live' | 'Coming soon';
  sublabel?: string;
}

export const projects: Project[] = [
  {
    id: 'lendos',
    tag: 'Live',
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
    worksUrl: '/works/lendos/',
    worksText: 'Смотреть работы',
    cta: 'https://t.me/iindev',
    ctaText: 'Хочу такой сайт',
    mockup: true,
    badge: 'Live',
    sublabel: 'Лендинг. Любой прайс.',
  },
];

export const placeholders: { sublabel: string }[] = [
  { sublabel: 'Тут может быть ваш сайт' },
  { sublabel: 'Тут может быть ваш сайт' },
  { sublabel: 'Тут может быть ваш сайт' },
];
