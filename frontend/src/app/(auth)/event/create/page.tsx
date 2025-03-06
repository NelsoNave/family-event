"use client";

import MapWithMarkers from "@/components/event/map-with-markers";
import { useEffect, useState } from "react";

interface Place {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  type: string;
}

export default function CreateEventPage() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [location, setLocation] = useState({ lat: 35.6812, lng: 139.7671 }); // 東京

  // ユーザーの現在位置を取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
      );
    }
  }, []);

  const searchCurrentLocation = async () => {
    const response = await fetch(
      `/api/geocode/route?query=${location.lat},${location.lng}`,
    );
    const data = await response.json();
    setPlaces(data.places);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Event</h1>

      <div className="mb-4">
        <button
          onClick={searchCurrentLocation}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Find Nearby Parks
        </button>
      </div>

      <MapWithMarkers
        apiKey={googleMapsApiKey}
        center={location}
        places={places}
        onPlaceSelect={(place) => setSelectedPlace(place)}
      />

      {selectedPlace && (
        <div className="mt-4 rounded border bg-green-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Selected Venue</h2>
          <p>
            <strong>Name:</strong> {selectedPlace.name}
          </p>
          <p>
            <strong>Address:</strong> {selectedPlace.address}
          </p>
          <button
            className="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={() => {
              // イベント作成フォームに選択した場所の情報を設定する処理
              console.log("Selected place for event:", selectedPlace);
            }}
          >
            Use This Location
          </button>
        </div>
      )}
    </div>
  );
}
