import { Suspense } from "react";


export function BookView() {
  return (
    <main className="flex min-h-screen flex-col py-24 px-5 gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 items-center lg:px-10">
        <h1 className="font-bold text-4xl">Terminbuchung</h1>
        <h2 className="font-medium text-xl text-muted-foreground text-center px-10">
          <div className={"max-w-xl mx-auto"}>
            Nutzen Sie unser einfaches Online-Buchungssystem, um schnell und
            unkompliziert Ihren nächsten Termin zu vereinbaren.
          </div>
        </h2>
      </div>
      <div className="my-4">
        <Suspense>
        {/*  <Demo />*/}
        </Suspense>
      </div>
    </main>
  );
}
