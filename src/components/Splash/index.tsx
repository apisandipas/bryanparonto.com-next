import React from "react";
import { FaRegHeart as HeartIcon } from "react-icons/fa";
import { styled } from "../../theme.config";
import { ContentContainer } from "../base";

const SplashWrapper = styled("div", {
  height: "calc($sizes$screenHeight - 325px )",
});

const HeroContainer = styled(ContentContainer, {
  position: "relative",
  display: "flex",
});

const HeroLeft = styled("div", {
  width: "$6of6",
  display: "flex",
  alignItems: "center",
  "@md": {
    width: "$3of6",
    display: "flex",
  },
});

const HeroRight = styled("div", {
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  "@md": {
    width: "$3of6",
    display: "flex",
  },
});

const H1 = styled("h1", {
  opacity: "85%",
  "> span": {
    backgroundColor: "$primary",
    padding: "0.25rem 0.6rem",
  },
  color: "#22272e",
  fontWeight: 700,
  lineHeight: "1.5",
  textTransform: "uppercase",
  position: "relative",
  fontSize: "$4xl",
  "@lg": {
    fontSize: "$5xl",
  },
});

const SplashCopy = styled("p", {
  fontSize: "$base",
  opacity: "85%",
  fontStyle: "italic",
  mt: "$10",
  p: "$4 1rem $4 $5",
  position: "relative;",
  background: "$odGreen",
  color: "#22272e",
  fontFamily: "Victor Mono",
  "@lg": {
    fontSize: "$xl",
  },
});

const Avatar = styled("img", {
  borderRadius: "100%",
  display: "none",
  width: "300px",
  height: "300px",
  border: "0.5rem solid $colors$primary25",
  "@md": {
    display: "block",
  },
  "@lg": {
    width: "375px",
    height: "375px",
  },
});

const Heart = styled(HeartIcon, {
  fill: "$odDarkRed",
  display: "inline-block",
  position: "relative",

  top: "4px",
});

export const Splash = () => {
  return (
    <>
      <SplashWrapper>
        <HeroContainer size={3}>
          <HeroLeft>
            <div>
              <H1>
                <span>Hi, I{"'"}m Bryan</span>
                <br />
                <span>
                  and I <Heart /> to code
                </span>
              </H1>
              <SplashCopy>
                I’m an experienced full-stack developer driven to deliver good
                software experiences by a deep love of creative problem solving.
              </SplashCopy>
            </div>
          </HeroLeft>
          <HeroRight>
            <Avatar src={"/me.jpg"} />
          </HeroRight>
        </HeroContainer>
      </SplashWrapper>
    </>
  );
};
