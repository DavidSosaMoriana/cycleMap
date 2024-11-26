import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import MapWrapper from "./pages/MapWrapper";
import NetworkList from "./pages/network-list";
import { NetworkProvider } from "./context/NetworkContext";
import { Logo } from "./pages/logo";

export default function Home() {
  return (
    <NetworkProvider>
      <main className="flex flex-col h-screen bg-gray-50">
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8 h-full">
            <div className="space-y-6">
              <Logo />
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-indigo-900">
                  Discover bike networks
                </h1>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing
                  placerat turpis magna sem tempor amet faucibus. Arcu praesent
                  viverra pellentesque nisi quam in rhoncus.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search network"
                    className="pl-10 w-full"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Country
                </Button>
              </div>

              <NetworkList />
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
              <MapWrapper />
            </div>
          </div>
        </div>
      </main>
    </NetworkProvider>
  );
}
