import { NetworkDetails } from "@/app/pages/NetworkDetails";

interface Props {
  params: {
    id: string;
  };
}

export default async function NetworkDetailsPage({ params }: Props) {
  const { id } = await params
  return <NetworkDetails networkId={id} />;
}
