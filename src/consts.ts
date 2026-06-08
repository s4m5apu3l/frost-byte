export const SITE = {
  name: 'iindev',
  url: 'https://iindev.ru',
  ogImage: '/assets/og-image.png',
  logo: '/assets/favicon.svg',
  description:
    'Веб-разработка, AI-автоматизация, SEO и Telegram-боты для малого бизнеса. Запуск за 2 недели. Код и доступы — ваши.',
  locale: 'ru_RU',
  telegram: 'https://t.me/iindev',
  email: 'iindev@tuta.io',
} as const;

export const NAV = [
  { href: '/#work', label: 'Работы' },
  { href: '/#about', label: 'О нас' },
  { href: '/#services', label: 'Услуги' },
  { href: '/#contact', label: 'Контакты' },
] as const;
