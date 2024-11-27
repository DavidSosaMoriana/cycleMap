import { NetworkDetails } from "@/app/pages/NetworkDetails";

interface Props {
  params: {
    id: string;
  };
}

export default function NetworkDetailsPage({ params }: Props) {
  return <NetworkDetails networkId={params.id} />;
}
