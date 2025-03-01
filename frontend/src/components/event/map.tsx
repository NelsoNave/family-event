"use client";

import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useState } from "react";

interface MapProps {
  apiKey: string;
}

interface StructuredAddress {
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export default function MapComponent({ apiKey }: MapProps) {
  const [place, setPlace] = useState("");
  const [q, setQ] = useState("Brooklyn+Bridge,New+York,NY");
  const [search, setSearch] = useState(false);
  const [structuredAddress, setStructuredAddress] =
    useState<StructuredAddress | null>(null);

  // 検索結果から構造化された住所を取得する関数
  const getStructuredAddress = async (query: string) => {
    try {
      // Geocoding APIを使用して住所情報を取得
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          query,
        )}&key=${apiKey}`,
      );

      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        const addressComponents = result.address_components;
        const location = result.geometry.location;

        // 住所コンポーネントを初期化
        let street_number = "";
        let route = "";
        let sublocality = "";
        let locality = "";
        let administrative_area_level_1 = "";
        let country = "";
        let postal_code = "";

        // 各住所コンポーネントを抽出
        addressComponents.forEach((component: any) => {
          const types = component.types;

          if (types.includes("street_number")) {
            street_number = component.long_name;
          } else if (types.includes("route")) {
            route = component.long_name;
          } else if (
            types.includes("sublocality") ||
            types.includes("sublocality_level_1")
          ) {
            sublocality = component.long_name;
          } else if (types.includes("locality")) {
            locality = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            administrative_area_level_1 = component.long_name;
          } else if (types.includes("country")) {
            country = component.long_name;
          } else if (types.includes("postal_code")) {
            postal_code = component.long_name;
          }
        });

        // 構造化された住所を設定
        setStructuredAddress({
          address1: street_number ? `${street_number} ${route}` : route,
          address2: sublocality,
          city: locality,
          province: administrative_area_level_1,
          country: country,
          postalCode: postal_code,
          formattedAddress: result.formatted_address,
          latitude: location.lat,
          longitude: location.lng,
        });
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            onChange={(e) => setPlace(e.target.value)}
            value={place}
            className="flex-1 rounded border p-2"
            placeholder="Enter a location"
          />
          <button
            className="rounded bg-blue-500 p-2 text-white"
            onClick={() => {
              setSearch(true);
              setQ(place);
              getStructuredAddress(place);
            }}
          >
            Search
          </button>
        </div>

        {search && (
          <GoogleMapsEmbed
            apiKey={apiKey}
            height={400}
            width="100%"
            mode="place"
            q={q}
          />
        )}

        {structuredAddress && (
          <div className="rounded border bg-gray-50 p-4">
            <h3 className="mb-2 font-bold">Structured Address</h3>
            <p>
              <strong>Address Line 1:</strong> {structuredAddress.address1}
            </p>
            {structuredAddress.address2 && (
              <p>
                <strong>Address Line 2:</strong> {structuredAddress.address2}
              </p>
            )}
            <p>
              <strong>City:</strong> {structuredAddress.city}
            </p>
            <p>
              <strong>Province/State:</strong> {structuredAddress.province}
            </p>
            <p>
              <strong>Country:</strong> {structuredAddress.country}
            </p>
            <p>
              <strong>Postal Code:</strong> {structuredAddress.postalCode}
            </p>
            <p>
              <strong>Coordinates:</strong> {structuredAddress.latitude},{" "}
              {structuredAddress.longitude}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {structuredAddress.formattedAddress}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
