import { Content } from "./components/Content";

export default function page({ params }: { params: { id: string } }) {
  return <Content id={params?.id} />;
}
