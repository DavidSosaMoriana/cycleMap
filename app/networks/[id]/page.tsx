/* @next-codemod-ignore */
import { NetworkDetails } from "@/app/pages/NetworkDetails";

interface Props {
  params: {
    id: string;
  };
}

async function getNetworkId(params: Props["params"]) {
  return params.id;
}

export default async function NetworkDetailsPage({ params }: Props) {
  const networkId = await getNetworkId(params);
  return <NetworkDetails networkId={networkId} />;
}
