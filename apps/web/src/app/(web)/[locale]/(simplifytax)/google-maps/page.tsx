import {Article} from "@ui/components/layout/article";
import {GoogleMaps} from "@ui/components/map/googleMaps";

export default function Page() {

  return (<>
      <Article className={"bg-surface-2"}>
        <div className="relative pb-[45%] min-h-64">
          <div
            className="w-full absolute h-full rounded-xl md:rounded-2xl shadow-img border-[0.75px] border-surface-1/80 overflow-hidden">
            <GoogleMaps/>
          </div>
        </div>
      </Article>
    </>
  );
}