import { PollView } from "@ui/entities/questionGroups/views/client/pollView/view";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  return <PollView questionGroupId={params.id} />;
}
