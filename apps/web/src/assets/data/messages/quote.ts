export const quotes = [
  {
    messageKey: "Quote1",
    imgSrc: "simplifytax-at/content/quotes/Anna-Moshammer"
  },
  {
    messageKey: "Quote2",
    imgSrc: "simplifytax-at/content/quotes/Fatma-Sahin"
  },
  {
    messageKey: "Quote3",
    imgSrc: "simplifytax-at/content/quotes/Jinwen-Song"
  },
  {
    messageKey: "Quote6",
    imgSrc: "simplifytax-at/content/quotes/Marco-Elsner"
  },
  {
    messageKey: "Quote7",
    imgSrc: "simplifytax-at/content/quotes/Patrizia-Schuster"
  },
  {
    messageKey: "Quote8",
    imgSrc: "simplifytax-at/content/quotes/Vesna-Jokic"
  },
  {
    messageKey: "Quote9",
    imgSrc: "simplifytax-at/content/quotes/Maja-Bogosavljevic"
  }
]

export const getQuoteMessages = (tQuotes: any) => {
  //const tQuotes = await getTranslations("Quotes");

  return quotes.map(quote => ({
    ...quote,
    subtitle: tQuotes(`${quote.messageKey}.subtitle`),
    quote: tQuotes(`${quote.messageKey}.quote`),
    name: tQuotes(`${quote.messageKey}.name`),
    position: tQuotes(`${quote.messageKey}.position`),
  }))
}