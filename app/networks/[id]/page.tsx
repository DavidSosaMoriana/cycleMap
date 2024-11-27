import { NetworkDetails } from "@/app/pages/NetworkDetails";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <NetworkDetails networkId={id} />;
}
