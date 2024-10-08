import { TiptapLink } from "novel/extensions";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

export const AdvancedLink = TiptapLink.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      type: {
        default: "text",
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => {
          const isText = !attributes.type || attributes.type === "text";
          const isButton = attributes.type === "button";
          const isLexikonLink = attributes.href.indexOf("/lexikon") > -1;

          console.log(isLexikonLink);

          return {
            "data-type": attributes.type,
            class: cn(
              "cursor-pointer no-underline",
              isText && "transition-colors",
              isText && isLexikonLink && "text-appAccent hover:text-appAccent",
              isText &&
                !isLexikonLink &&
                "text-muted-foreground underline underline-offset-[3px] hover:text-primary",
              isButton && buttonVariants({ variant: "default" }),
            ),
          };
        },
      },
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: cn(
              attributes.backgroundColor &&
                attributes.type === "button" &&
                `background-color: ${attributes.backgroundColor};`,
              !attributes.backgroundColor &&
                attributes.type === "button" &&
                `background-color: hsl(var(--bg-primary));`,
            ),
          };
        },
      },
    };
  },
}).configure({
  openOnClick: false,
});
