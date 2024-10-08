"use client";
import React from 'react';
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import {CarouselQuoteItem, CarouselQuoteItemProps} from "./item";


//const handleDragStart = (e: any) => e.preventDefault();

export interface QuoteCarouselProps extends CarouselQuoteItemProps {
  messageKey: string
}

export function QuoteCarousel({quotes}: {
  quotes: QuoteCarouselProps[]
}) {

  const items = quotes.map(quote => <CarouselQuoteItem
    key={quote.messageKey}
    {...quote}
  />);

  return (
    <div id={"quote-carousel"} >
      <AliceCarousel items={items} disableDotsControls={true} disableButtonsControls={true} mouseTracking={false} autoPlay={true} infinite={true} autoPlayInterval={4000} animationDuration={400} animationType={"fadeout"}>
      </AliceCarousel>
    </div>
  );
}