import { NodeHandler, NodeHandlers, NodeProps } from "./renderer";
import Image from "next/image";
import Script from "next/script";
import { cn } from "@ui/lib/utils";
import { getEmbedUrlFromYoutubeUrl } from "@ui/lib/editorUtils";
import { CldImage } from "@ui/components/cldImage";
import { TermHoverCard } from "@ui/entities/posts/views/client/postDetailView/term-hover-card";
import React from "react";

const TextRender: NodeHandler = (props: NodeProps) => {
  if (!props.node.text) {
    console.log("missing text", props);
    return <></>;
  }

  const payload: string = props.node.text;

  // define variable for react style
  let style: React.CSSProperties = {};

  let link = null;
  let sub = null;
  let sup = null;
  let code = null;

  // dynamically process text marks
  props.node.marks &&
    props.node.marks.forEach((mark) => {
      const linkStyle: React.CSSProperties = {};
      switch (mark.type) {
        case "bold":
          style.fontWeight = "bold";
          break;
        case "italic":
          style.fontStyle = "italic";
          break;
        case "underline":
          style.textDecorationLine = "underline";
          break;
        case "highlight":
          if (mark.attrs?.color) {
            style.backgroundColor = mark.attrs.color;
          }
          break;
        case "textStyle":
          if (mark.attrs?.color) {
            style.color = mark.attrs.color;
          }
          if (mark.attrs?.fontSize) {
            style.fontSize = mark.attrs.fontSize;
          }
          if (mark.attrs?.lineHeight) {
            style.lineHeight = mark.attrs.lineHeight;
          }
          break;
        case "strike":
          style.textDecorationLine = "line-through";
          break;
        case "superscript":
          sub = <sup>{payload}</sup>;
          break;
        case "subscript":
          sup = <sub>{payload}</sub>;
          break;
        case "code":
          code = (
            <code className="rounded-md bg-slate-200 text-display px-1.5 py-1 font-mono font-medium">
              {payload}
            </code>
          );
          break;
        case "link":
          if (mark.attrs.backgroundColor && mark.attrs.type === "button") {
            linkStyle.backgroundColor = mark.attrs.backgroundColor;
          }

          if (!mark.attrs.backgroundColor && mark.attrs.type === "button") {
            linkStyle.backgroundColor = "var(--custom-appAccent)";
          }

          if (mark.attrs.href.indexOf("/lexikon/") > -1) {
            link = (
              <TermHoverCard
                title={payload}
                href={mark.attrs.href}
                className={cn(
                  (!mark.attrs.type || mark.attrs.type === "text") &&
                    "text-appAccent font-[530] hover:text-appAccent transition-colors cursor-pointer",
                  mark.attrs.type === "button" &&
                    "text-white rounded no-underline px-4 py-2 cursor-pointer",
                )}
                style={linkStyle}
              />
            );
            break;
          }

          link = (
            <a
              href={mark.attrs.href}
              target={"_blank"}
              rel={"noopener noreferrer nofollow"}
              className={cn(
                (!mark.attrs.type || mark.attrs.type === "text") &&
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                mark.attrs.type === "button" &&
                  "text-white rounded no-underline px-4 py-2 cursor-pointer",
              )}
              style={linkStyle}
            >
              {payload}
            </a>
          );
          break;
        default:
          console.log("unhandled mark", mark);
      }
    });

  if (link) return link;
  if (sub) return sub;
  if (sup) return sup;
  if (code) return code;

  return <span style={style}>{payload}</span>;
};

const Heading: NodeHandler = (props) => {
  switch (props.node.attrs?.level) {
    case 1:
      return <h1>{props.children}</h1>;
    case 2:
      return <h2>{props.children}</h2>;
    case 3:
      return <h3>{props.children}</h3>;
    default:
      return <h4>{props.children}</h4>;
  }
};

const CodeBlock: NodeHandler = (props) => {
  return (
    <div
      className={
        "rounded-md bg-slate-200 text-display border p-5 font-mono font-medium"
      }
    >
      {props.children}
    </div>
  );
};

const HorizontalRule: NodeHandler = (props) => {
  return <hr className="mt-4 mb-6 border-t border-stone-300" />;
};

const Youtube: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const embedUrl = getEmbedUrlFromYoutubeUrl({
    url: attrs?.src,
    startAt: attrs?.start || 0,
  });

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedUrl!}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const QuestionItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const questionId = attrs?.questionId;

  const embedUrl = `/embed/question/${questionId}`;

  return (
    <>
      <Script
        src={"/js/embed.js"}
        id={new Date().toISOString()}
        onLoad={() => {
          // @ts-ignore
          if (
            // @ts-ignore
            typeof window.resizeEmbeddedItems !== "undefined" &&
            // @ts-ignore
            typeof window.iFrameResize !== "undefined"
          ) {
            // @ts-ignore
            window.resizeEmbeddedItems();
          }
        }}
      ></Script>
      <div
        className={"w-full asm-question-embed"}
        data-question-id={questionId}
      >
        <iframe
          src={embedUrl}
          className={"w-full"}
          id={`asm-question-${questionId}`}
        ></iframe>
      </div>
    </>
  );
};

const FaqGroupItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const faqGroupId = attrs?.faqGroupId;

  const embedUrl = `/embed/faq-group/${faqGroupId}`;

  return (
    <>
      <Script
        src={"/js/embed.js"}
        id={new Date().toISOString()}
        onLoad={() => {
          // @ts-ignore
          if (
            // @ts-ignore
            typeof window.resizeEmbeddedItems !== "undefined" &&
            // @ts-ignore
            typeof window.iFrameResize !== "undefined"
          ) {
            // @ts-ignore
            window.resizeEmbeddedItems();
          }
        }}
      ></Script>
      <div
        className={"w-full asm-faq-group-embed"}
        data-faq-group-id={faqGroupId}
      >
        <iframe
          src={embedUrl}
          className={"w-full"}
          id={`asm-faq-group-${faqGroupId}`}
        ></iframe>
      </div>
    </>
  );
};

const SpotifyItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const url = attrs?.url;

  return (
    <div className={"spotify-embed !pl-0 !mt-0"}>
      <iframe
        src={url}
        height="152"
        width="100%"
        title="Spotify iFrame"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "12px" }}
      ></iframe>
    </div>
  );
};

const InstagramItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const permalink = attrs?.permalink;

  return (
    <>
      <Script src={"https://www.instagram.com/embed.js"}></Script>
      <div
        className={
          "p-2 bg-white shadow rounded overflow-hidden inline-block [&>iframe]:!border-none"
        }
      >
        <blockquote
          className={"instagram-media"}
          data-instgrm-permalink={permalink}
          data-instgrm-version="14"
          data-instgrm-captioned={true}
        >
          <section></section>
        </blockquote>
      </div>
    </>
  );
};

const TikTokItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const videoId = attrs?.videoId;

  return (
    <>
      <Script src={"https://www.tiktok.com/embed.js"}></Script>
      <div
        className={"p-2 bg-white shadow rounded overflow-hidden inline-block"}
      >
        <blockquote
          className={"tiktok-embed [&>iframe]:!w-auto !pl-0 !mt-0"}
          data-video-id={videoId}
          //style={{maxWidth: "605px", minWidth: "325px"}}
        >
          <section></section>
        </blockquote>
      </div>
    </>
  );
};

const JobItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  const jobId = attrs?.jobId;

  const embedUrl = `/embed/job/item/${jobId}`;

  return (
    <div className="w-full">
      <iframe src={embedUrl} className={"w-full h-72 lg:h-44"}></iframe>
    </div>
  );
};

const Frame: NodeHandler = (props) => {
  let style: React.CSSProperties = {};

  if (props.node.attrs) {
    const attrs = props.node.attrs;

    if (attrs.frameBorderColor) {
      style.borderColor = attrs.frameBorderColor;
    }

    if (attrs.frameBackgroundColor) {
      style.backgroundColor = attrs.frameBackgroundColor;
    }
  }

  return (
    <div
      className="w-full p-4 md:p-6 bg-white border-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
      style={style}
    >
      {props.children}
    </div>
  );
};

const FlexBox: NodeHandler = (props) => {
  return (
    <div
      className={
        "flex gap-4 items-center w-full flex-wrap [&>*]:mt-0 [&>*]:mb-0"
      }
    >
      {props.children}
    </div>
  );
};

const Paragraph: NodeHandler = (props) => {
  // dynamically process text marks
  let style: React.CSSProperties = {};

  if (props.node.attrs) {
    const attrs = props.node.attrs;

    if (attrs.textAlign) {
      style.textAlign = attrs.textAlign;
    }
  }

  return (
    <>
      <p
        style={style}
        className={
          props.node.content === undefined ? "before:content-[''] pt-0.5" : ""
        }
      >
        {props.children}
      </p>
    </>
  );
};

const HardBreak: NodeHandler = (props) => {
  return <br />;
};

const Blockquote: NodeHandler = (props) => {
  return (
    <blockquote className="border-l-4 border-appAccent bg-[#eef2fb] p-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      {props.children}
    </blockquote>
  );
};

const Figure: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  return (
    <figure className="w-full flex flex-col md:flex-row gap-2 items-center mt-6">
      <Image
        alt={attrs?.alt}
        src={attrs?.src}
        title={attrs?.title}
        width={attrs?.width ?? 1200}
        height={attrs?.height ?? 600}
        className={cn(
          "w-full md:w-1/3 shrink-0",
          (!attrs?.figureImageStyle ||
            attrs?.figureImageStyle === "photo-frame") &&
            "p-2 bg-white md:-rotate-6 shadow-md",
          attrs?.figureImageStyle === "normal" && "rounded",
        )}
      />
      <figcaption className="w-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {props.children}
      </figcaption>
    </figure>
  );
};

const Passthrough: NodeHandler = (props) => {
  return <>{props.children}</>;
};

const ImageNode: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  if (attrs?.imageLink) {
    return (
      <a
        href={attrs.imageLink}
        target={"_blank"}
        rel={"noopener noreferrer nofollow"}
        className={"inline-block"}
      >
        {attrs?.src?.indexOf("https://de.statista.com/") > -1 ? (
          <img
            alt={attrs?.alt ?? "Bild"}
            src={attrs?.src}
            width={attrs?.width ?? 1200}
            height={attrs?.height ?? 600}
            className={"rounded"}
          />
        ) : (
          <CldImage
            unoptimized={attrs?.src?.indexOf("https://de.statista.com/") > -1}
            alt={attrs?.alt ?? "Bild"}
            src={attrs?.src}
            width={attrs?.width ?? 1200}
            height={attrs?.height ?? 600}
            className={cn(
              "rounded",
                attrs?.type === "photo-frame" &&
                "p-2 bg-white md:-rotate-6 shadow-md",
            )}
          />
        )}
      </a>
    );
  }

  return (
    <CldImage
      unoptimized={attrs?.src?.indexOf("https://de.statista.com/") > -1}
      alt={attrs?.alt ?? "Bild"}
      src={attrs?.src}
      width={attrs?.width ?? 1200}
      height={attrs?.height ?? 600}
      className={cn(
        "rounded",
        attrs?.type === "photo-frame" &&
        "p-2 bg-white md:-rotate-6 shadow-md",
      )}
    />
  );
};

const BulletList: NodeHandler = (props) => {
  let style: React.CSSProperties = {};

  if (props.node.attrs) {
    const attrs = props.node.attrs;

    if (attrs.tight) {
      style.marginTop = "-0.025em";
    }
  }

  return (
    <ul className="list-disc list-outside leading-3 -mt-2">{props.children}</ul>
  );
};

const OrderedList: NodeHandler = (props) => {
  let style: React.CSSProperties = {};

  if (props.node.attrs) {
    const attrs = props.node.attrs;

    if (attrs.tight) {
      style.marginTop = "-0.025em";
    }
  }

  return (
    <ol className="list-decimal list-outside leading-3 -mt-2">
      {props.children}
    </ol>
  );
};

const ListItem: NodeHandler = (props) => {
  const attrs = props.node.attrs;

  if (attrs?.imgSrc) {
    return (
      <li className="leading-normal flex gap-2 items-start not-prose py-1.5">
        <img
          src={attrs.imgSrc}
          className="w-5 h-5 -ml-5"
          alt={"Aufzählungszeichen"}
        />
        <div>{props.children}</div>
      </li>
    );
  }

  return <li className={"leading-normal -mb-2"}>{props.children}</li>;
};

const ImageFrame: NodeHandler = (props) => {
  return (
    <div
      className={
        "w-full [&>*]:mt-0 [&>*]:mb-0 flex flex-col md:flex-row gap-2 items-center mt-6 [&>img]:w-full [&>img]:md:w-1/3 shrink-0"
      }
    >
      {props.children}
    </div>
  );
};

export const PostContentMapping: NodeHandlers = {
  text: TextRender,
  paragraph: Paragraph,
  doc: Passthrough,
  hardBreak: HardBreak,
  image: ImageNode,
  bulletList: BulletList,
  orderedList: OrderedList,
  listItem: ListItem,
  heading: Heading,
  horizontalRule: HorizontalRule,
  blockquote: Blockquote,
  figure: Figure,
  youtube: Youtube,
  frame: Frame,
  flexbox: FlexBox,
  jobItem: JobItem,
  questionItem: QuestionItem,
  tiktokItem: TikTokItem,
  instagramItem: InstagramItem,
  spotifyItem: SpotifyItem,
  faqGroupItem: FaqGroupItem,
  codeBlock: CodeBlock,
  imageFrame: ImageFrame,
};
