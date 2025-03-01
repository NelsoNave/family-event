"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

interface Place {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  type: string; // 例: "park", "restaurant" など
}

interface MapWithMarkersProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  places?: Place[];
  onPlaceSelect?: (place: Place) => void;
}

export default function MapWithMarkers({
  apiKey,
  center = { lat: 35.6812, lng: 139.7671 }, // デフォルトは東京
  zoom = 14,
  places = [],
  onPlaceSelect,
}: MapWithMarkersProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // マップの初期化
  useEffect(() => {
    if (!mapRef.current) return;

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center,
        zoom,
        mapTypeControl: false,
      });
      setMap(mapInstance);
    });
  }, [apiKey, center, zoom]);

  // マーカーの設定
  useEffect(() => {
    if (!map || !places.length) return;

    // 既存のマーカーをクリア
    markers.forEach((marker) => marker.setMap(null));

    // 新しいマーカーを作成
    const newMarkers = places.map((place) => {
      const marker = new google.maps.Marker({
        position: place.location,
        map,
        title: place.name,
        animation: google.maps.Animation.DROP,
      });

      // 情報ウィンドウを作成
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3 style="margin: 0; font-size: 16px;">${place.name}</h3>
            <p style="margin: 5px 0 0;">${place.address}</p>
            <p style="margin: 5px 0 0; color: #666;">${place.type}</p>
          </div>
        `,
      });

      // マーカークリックイベント
      marker.addListener("click", () => {
        // 他の情報ウィンドウを閉じる
        markers.forEach((m) => {
          if (m.getTitle() !== marker.getTitle()) {
            google.maps.event.trigger(m, "closeclick");
          }
        });

        infoWindow.open({
          anchor: marker,
          map,
        });

        // 選択された場所を設定
        const selectedPlace = places.find((p) => p.name === marker.getTitle());
        if (selectedPlace) {
          setSelectedPlace(selectedPlace);
          onPlaceSelect?.(selectedPlace);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // マップの表示範囲を調整
    if (newMarkers.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend(place.location);
      });
      map.fitBounds(bounds);
    }

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map, places, onPlaceSelect]);

  return (
    <div className="flex flex-col gap-4">
      <div ref={mapRef} className="h-[400px] w-full rounded border"></div>

      {selectedPlace && (
        <div className="rounded border bg-gray-50 p-4">
          <h3 className="mb-2 font-bold">{selectedPlace.name}</h3>
          <p>{selectedPlace.address}</p>
          <p className="text-sm text-gray-500">{selectedPlace.type}</p>
        </div>
      )}
    </div>
  );
}
