const quotes = [
  {
    quote: `"You cannot change what you are only what you do."`,
    author: `- Philip Pullman -`,
  },
  {
    quote: `" Lay a firm foundation with the bricks that others throw at you."`,
    author: `- David Brinkley -`,
  },
  {
    quote:
    `"Change the way you look at things and the things you look at change."`,
    author: `- Wayne Dyer -`,
  },
  {
    quote:
    `" If you run you stand a chance of losing but if you dont run youve already lost"`,
    author: `- Barack Obama -`,
  },
  {
    quote: `" If you have always done it that way it is probably wrong."`,
    author: `- Charles Kettering -`,
  },
  {
    quote:
    `"The greatest mistake you can make in life is to be continually fearing you will make one."`,
    author: `- Elbert Hubbard -`,
  },
  {
    quote:
    `"Not everything that is faced can be changed but nothingcan be changed until it is faced."`,
    author: `- James Baldwin -`,
  },
  {
    quote: `" If work were so pleasant the rich would keep it for themselves."`,
    author: `- Mark Twain -`,
  },
  {
    quote: `"Only I can change my life. No one can do it for me."`,
    author: `- Carol Burnett -`,
  },
  { quote: `"When in doubt choose change."`, author: `- Lily Leung -` },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)]

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;