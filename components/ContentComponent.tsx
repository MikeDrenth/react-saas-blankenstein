import React from "react";
import Link from "next/link";
import Image from "next/image";

type ContentProps = {
  content: ContentProp;
};

type ContentProp = {
  content_highlight: string;
  content_title: string;
  content_content: string;
  content_link: string;
};

const ContentComponent = ({ content }: ContentProps) => {
  return (
    <div className="bg-slate-600 font-sans font-normal flex flex-col rounded-md">
      {content.content_highlight && (
        <Image
          src="https://boeken.blankensteinaanzee.nl/web/assets/images/images/static/website/664/highlight/content-photo-1455641374154-422f32e234cd.jpg.webp?s=407587722679bc2d5e26a3f6ba099882"
          alt="Image"
          width={450}
          height={100}
          className="rounded-t-md"
        />
      )}
      <div className="p-4">
        {content.content_title && (
          <h1 className="text-3xl mb-4">{content.content_title}</h1>
        )}
        {content.content_content && (
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: content.content_content }}
          />
        )}
        {content.content_link && (
          <Link
            className="flex bg-white p-2 text-black rounded-md text-center justify-center"
            href={content.content_link}
          >
            Lees verder
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContentComponent;
