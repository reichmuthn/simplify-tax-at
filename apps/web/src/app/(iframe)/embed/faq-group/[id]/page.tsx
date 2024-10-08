type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  console.log(params);

  return "FaqGroup";
}
