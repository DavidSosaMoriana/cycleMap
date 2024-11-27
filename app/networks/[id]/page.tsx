import { NetworkDetails } from "@/app/pages/NetworkDetails";

export default function NetworkDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <NetworkDetails networkId={params.id} />;
}
