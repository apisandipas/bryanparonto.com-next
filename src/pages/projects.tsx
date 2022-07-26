import React from "react";
import Layout from "../components/Layout";
import { getAllProjects } from "../lib/api";
import { styled } from "../theme.config";

const ProjectCardWrapper = styled("div", {
  backgroundColor: "$odGray",
  border: "1px solid $colors$gray900",
  padding: "$4 $6",
  marginBottom: "$4",
  mx: "$4",
  borderRadius: "$xl",
  display: "flex",
  flexFlow: "column",
  "@md": {
    flexFlow: "row",
    "> div": {
      flex: "1 0 0",
      width: "$6of12",
    },
  },
  "> div": {
    flex: "1 0 0",
    width: "$12of12",
  },
});

const ProjectImage = styled("img", {
  maxWidth: "475px",
  borderRadius: "$xl",
});

const Tag = styled("span", {
  borderRadius: "$xl",
  backgroundColor: "$odCyan",
  color: "$odGray",
  padding: "0.25rem 0.5rem",
  "& + &": {
    marginLeft: "0.25rem",
  },
});

const ProjectDescription = styled("div", {
  pr: "$4",
  flex: "2",
});

const TagLinkList = ({ tech }) => {
  const techList = tech?.split(" ");
  return techList?.map((t) => {
    return <Tag key={t}>{t}</Tag>;
  });
};

const Title = styled("h1", {
  mx: "$4",
  mb: "$4",
});

const ProjectCard = (props) => {
  const { title, image, url, content, tech, client, launch_date } = props;
  return (
    <ProjectCardWrapper>
      <div>
        <h2>{title}</h2>
        <ProjectDescription dangerouslySetInnerHTML={{ __html: content }} />
        Client: {client}
        <br />
        Launch: {launch_date}
        <br /> <br />
        <TagLinkList tech={tech} />
        <br />
        <br />
        <a href={url} rel="noreferrer nofollow" target="_blank">
          See it for yourself {"-->"}
        </a>
      </div>
      <div>
        <a href={url} rel="noreferrer nofollow" target="_blank">
          <ProjectImage src={image} />
        </a>
      </div>
    </ProjectCardWrapper>
  );
};

const data = [
  {
    id: 1,
    title: "Project 1",
    image: "/projects/zap2it.png",
    url: "http://google.com",
    html: "<div>Hello</div>",
    tech: "React",
    client: "Me",
    launch_date: "2022-07-26",
  },
];

export default function Projects({ projects }) {
  return (
    <>
      <Layout size={3}>
        <Title>Projects</Title>
        {projects?.map((project, index) => {
          console.log({ project });
          return (
            <ProjectCard
              key={project.id + index}
              onClick={() => console.log(project)}
              {...project}
            />
          );
        })}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const projects = await getAllProjects();
  console.log({ projects });
  return {
    props: {
      projects,
    },
  };
}
