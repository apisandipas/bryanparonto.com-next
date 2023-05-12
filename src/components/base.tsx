import React from "react";
import { styled } from "../theme.config";
import Link from "next/link";

export const Container = styled("div", {
  /* pt: '$6', */
  mx: "auto",
  height: "100%",
  variants: {
    size: {
      1: {
        maxWidth: "430px",
      },
      2: {
        maxWidth: "715px",
      },
      3: {
        maxWidth: "1024px",
      },
      4: {
        maxWidth: "1280px",
      },
      5: {
        maxWidth: "none",
      },
    },
  },
  defaultVariants: {
    size: "3",
  },
});

export const ContentContainer = styled(Container, {
  paddingLeft: "$4",
  paddingRight: "$4",
});

export const SlantedSection = styled("section", {
  "> div": {
    paddingTop: "$20",
    paddingBottom: "$20",
  },
});

export const TagWrapper = styled("div", {
  fontSize: "var(--fontSizes-sm)",
  display: "inline-block",
  mb: "$2",
  "@md": {
    marginLeft: "auto",
  },
});

export function Tag({ name }: { name: string }) {
  return <Link href={`/tags/${name}`}>{name}</Link>;
}

export function Taglist({ tags }: { tags: string }) {
  return (
    <TagWrapper>
      {tags?.map((tag) => (
        <span key={tag}>
          :
          <Tag name={tag} />:
        </span>
      ))}
    </TagWrapper>
  );
}
