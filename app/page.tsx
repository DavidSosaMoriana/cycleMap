import MapWrapper from "./pages/MapWrapper";
import NetworkList from "./pages/network-list";
import { NetworkProvider } from "./context/NetworkContext";
import { Logo } from "./pages/logo";
import countriesData from "../app/data/countries.json";
import { SearchFilters } from "./pages/search-filters";
import { Suspense } from "react";

async function getCountries() {
  return countriesData.data;
}

export default async function Home() {
  const countries = await getCountries();
  return (
    <Suspense>
      <NetworkProvider>
        <main className="flex flex-col h-screen bg-gray-50">
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8 h-full">
              <div className="space-y-6">
                <Logo />
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-indigo-900">
                    Discover bike networks
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Lorem ipsum dolor sit amet consectetur...
                  </p>
                </div>

                <SearchFilters countries={countries} />

                <NetworkList />
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
                <MapWrapper />
              </div>
            </div>
          </div>
        </main>
      </NetworkProvider>
    </Suspense>
  );
}
