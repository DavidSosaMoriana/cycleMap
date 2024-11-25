import { NetworkList } from "./pages/network-list";
import { NetworkMap } from "./pages/network-map";
import { SearchFilters } from "./pages/search-filters";
import { Logo } from "./pages/logo";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <div className="w-[480px] flex-shrink-0 border-r overflow-auto">
        <div className="p-6 space-y-6">
          <Logo />
          <div>
            <h1 className="text-4xl font-bold text-[#4338CA]">
              Discover bike networks
            </h1>
            <p className="mt-2 text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing
              placerat turpis magna sem tempor amet faucibus. Arcu praesent
              viverra pellentesque nisi quam in rhoncus.
            </p>
          </div>
          <SearchFilters />
          <NetworkList />
        </div>
      </div>
      <div className="flex-1 relative">
        <NetworkMap />
      </div>
    </div>
  );
}
