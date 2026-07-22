// app/notes/[id]/page.tsx

import { fetchSneackersById } from "@/src/lib/api";
import SneakerDetailsClient from "./SneakerDetails";
type Props = {
  params: Promise<{ id: string }>;
};

const SneakerDetails = async ({ params }: Props) => {
  const { id } = await params;
  const sneaker = await fetchSneackersById(id);

  return <SneakerDetailsClient sneaker={sneaker} />;
};

export default SneakerDetails;
