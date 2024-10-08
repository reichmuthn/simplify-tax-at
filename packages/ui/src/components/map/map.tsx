"use client";
import React, {useState} from "react";
import {GoogleMap, InfoWindow, Libraries, Marker, useJsApiLoader,} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

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

type GMapProps = {
  showMarkerInfo?: boolean;
  mapZoom?: number;
  showControls?: boolean;
}

function GMap({showMarkerInfo = true, mapZoom = 15, showControls = true}: GMapProps) {
  const lib: Libraries = ["places"];
  const id = ["6e120bcd575d29f7"];
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    libraries: lib,
    mapIds: id,
    googleMapsApiKey: "AIzaSyDLtf03FmjAGMUBHfoO2NRuxMc1uTPb2aI"
  });

  const [markerInfoOpen, setMarkerInfoOpen] = useState(true);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    // map.setZoom(15);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={mapZoom}
      options={{
        mapId: "c9f592de3471796",
        disableDefaultUI: !showControls,
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={center}
        icon={{
          url: "/MapMarker.svg",
          scaledSize: new google.maps.Size(50, 50),
        }}
        onClick={() => setMarkerInfoOpen(!markerInfoOpen)}
      >
        {showMarkerInfo && (
          <InfoWindow onCloseClick={() => setMarkerInfoOpen(false)}>
            <MarkerInfo/>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}

const Map = React.memo(GMap);

export {Map};
