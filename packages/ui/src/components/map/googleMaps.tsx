"use client";
import React from "react";
import {AdvancedMarker, APIProvider, InfoWindow, Map, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";

const center = {
  lat: 48.188464220388354,
  lng: 16.379143756048485
};

const MarkerInfo = () => {
  return (
    <div className="pt-3 px-2 text-sm">
      <div className="font-medium text-display">Simplify Tax</div>
      <div className="text-body text-xs pt-0.5">
        <p>Mommsengasse 33 Top 2+5</p>
        <p>1010 Wien</p>
        <p>Österreich</p>
      </div>
    </div>
  );
};


function MarkerWithInfoWindow() {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker position={center} ref={markerRef} title={"Simplify Tax"}>
      <img src={"/MapMarker.svg"} alt="Google Maps marker" height={40} width={40}/>
      <InfoWindow anchor={marker}>
        <MarkerInfo/>
      </InfoWindow>
    </AdvancedMarker>
  );
}


export function GoogleMaps() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return;

  return (
    <APIProvider apiKey={apiKey} libraries={["marker"]}>
      <Map
        defaultZoom={15}
        defaultCenter={center}
        mapId={"c9f592de3471796"}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
        className="w-full h-full"
      >
        <MarkerWithInfoWindow/>
      </Map>
    </APIProvider>
  );
}
