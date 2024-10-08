import React from "react";
import { ContentEditWrapper } from "@ui/views/content/example/edit-wrapper";

export function ExampleContentView({
  data,
}: {
  data?: { subtitle: string; title: string; description: string } | null;
}) {
  return (
    <ContentEditWrapper>
      <section className="bg-white min-h-screen h-full">
        <div className="mx-auto max-w-7xl space-y-12 py-8 sm:py-16 lg:space-y-20 px-4 sm:px-6 md:px-8">
          <div className="items-center gap-8 max-w-3xl mx-auto lg:max-w-none grid grid-cols-1 lg:grid-cols-2 xl:gap-16">
            <div>
              <div className="mb-1 sm:1.5 md:mb-2 lg:mb-3">
                <h3 className={`text-black text-sm md:text-base font-[530]`}>
                  {data?.subtitle}
                </h3>
              </div>
              <h2
                className={`text-black mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight`}
              >
                {data?.title}
              </h2>
              <p
                className={`text-black font-normal text-base md:text-lg lg:text-xl`}
                data-editable={"exampleContent"}
              >
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </ContentEditWrapper>
  );
}
