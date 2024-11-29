import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul>
          <li><a href="/google-map-search-address">Google Map Search Address</a></li>
          <li><a href="/osm-map-search-address">OpenStreetMap Map Search Address</a></li>
          <li><a href="/simple-map">Simple Map</a></li>
          <li><a href="/mapbox-map-search-address">Mapbox Map Search Address</a></li>
        </ul>
      </main>
    </div>
  );
}
