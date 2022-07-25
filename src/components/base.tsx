import { styled } from "../theme.config";

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
