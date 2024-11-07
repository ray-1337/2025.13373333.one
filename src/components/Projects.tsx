import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Select, Checkbox, Flex, Tooltip, Group, Text, Loader } from "@mantine/core";
import { useDebouncedValue, useViewportSize } from "@mantine/hooks";

// utility import
import shuffleArray from "@/utility/shuffle-array";

// configuration import
import ProjectsList, { ProjectType } from "@/config/Projects";
const shuffledProjectsList = shuffleArray(ProjectsList);

// media import
const RightArrow = dynamic(() => import("@/icons/RightArrow"));

// style
import style from "@/styles/components/Projects.module.css";

export default function Projects() {
  const { width: windowWidth } = useViewportSize();

  const [selectedProjectIndex, selectProjectIndexState] = useState<number | null>(null);
  const [isVideoSnapshotLoaded, setVideoSnapshotLoadState] = useState<boolean>(false);
  const [delayedProjectSelectionIndex] = useDebouncedValue(selectedProjectIndex, 750);

  // max height for aesthetic
  const [maxHeightSelectedProject, setMaxHeightSelectedProject] = useState<number>(0);
  
  // filter
  type ProjectsFilterListType = typeof ProjectsList;
  type ProjectsFilterTypes = typeof ProjectType[number];
  const [filterState, setFilterState] = useState<ProjectsFilterTypes | null>(null);
  const [filteringTransitionState, setFilterTransitionState] = useState<boolean>(false);
  const [filteredProjects, setFilteredProjects] = useState<ProjectsFilterListType | null>(null);
  const [showHidden, setHiddenState] = useState<boolean>(false);

  const handleFilterChange = (value: ProjectsFilterTypes) => {
    if (filteringTransitionState === false) {
      setFilterTransitionState(true);
    };

    setTimeout(() => {
      setFilterState(value);

      if (value === null) {
        return setFilteredProjects(null);
      };

      const filteredData = [...shuffledProjectsList].sort((a, b) => {
        if (a.type === value && b.type !== value) return -1;
        if (a.type !== value && b.type === value) return 1;
        
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
  
        return 0;
      });

      setFilteredProjects(filteredData);
    }, 425);

    setTimeout(() => setFilterTransitionState(false), 500);

    return;
  };

  useEffect(() => {
    if (
      typeof selectedProjectIndex === "number" && 
      (typeof (filteredProjects !== null ? filteredProjects : shuffledProjectsList)?.[selectedProjectIndex]?.ytVidId === "string")
    ) {
      setMaxHeightSelectedProject((prev) => prev + 650);
    };

    setVideoSnapshotLoadState(false);
  }, [selectedProjectIndex]);

  return (
    <section className={style["projects-root"]}>
      {/* filter and stuff */}
      <Flex mb={windowWidth > 600 ? "3.75rem" : "2rem"} gap={"xl"} direction={windowWidth > 600 ? "row" : "column-reverse"} align={windowWidth > 600 ? "center" : "flex-start"}>
        {/* project's filter */}
        <Select onChange={(value) => handleFilterChange(value as typeof ProjectType[number])} comboboxProps={{transitionProps: {transition: "fade-down", duration: 125}}} size={"md"} maw={windowWidth > 600 ? "30%" : "100%"} data={ProjectType} allowDeselect clearable placeholder={"Filter"}/>

        {/* show hidden content */}
        <Tooltip position={"bottom"} openDelay={150} withArrow label={"Hidden content refers to outdated, underperforming, or least-favorite projects."}>
          <Checkbox.Card bg={"dark.6"} radius="sm" checked={showHidden} onClick={() => setHiddenState((c) => !c)} px={"1rem"} py={"xs"} maw={"max-content"}>
            <Group wrap="nowrap" align="center">
              <Checkbox.Indicator bg={"dark.7"} />

              <Text size={"sm"} fw={500}>
                Show hidden projects
              </Text>
            </Group>
          </Checkbox.Card>
        </Tooltip>
      </Flex>

      {/* projects list */}
      <section className={style["projects-list-root"]} data-animation-01={filteringTransitionState}>
        {
          (filteredProjects !== null ? filteredProjects : shuffledProjectsList).map((projectContent, projectIndex) => (
            <div data-hidden={projectContent?.hidden === true && showHidden === false} style={{transitionDelay: (filteredProjects !== null && ((projectContent?.hidden === true && showHidden === false) ? projectIndex - 1 : projectIndex) <= 3) ? `${(75 * projectIndex)}ms` : undefined}} data-stop-interactive={filterState !== null ? projectContent.type !== filterState : undefined} data-indexes={projectIndex} className={style["projects-item-root"]} key={`${projectIndex}-${projectContent.name}`} data-selected={selectedProjectIndex === projectIndex}>
              {/* project image */}
              <div className={style["projects-item-projectile"]}>
                {/* image */}
                <div className={style["projects-item-projectile-adhd"]} onClick={(event) => {
                  selectProjectIndexState((prev) => (typeof prev === "number" && projectIndex === prev) ? null : projectIndex)

                  // this is goofy af
                  setMaxHeightSelectedProject(event.currentTarget?.parentElement?.parentElement?.children?.[1]?.scrollHeight || 0);
                }}>
                  <div className={style["projects-item-image"]}>
                    <div className={style["projects-item-media-box"]}>
                      <img alt={`A banner image of a project called ${projectContent.name}`} src={projectContent.imgURL} loading={"lazy"} />

                      {
                        ((typeof selectedProjectIndex === "number" ? selectedProjectIndex : delayedProjectSelectionIndex) === projectIndex && typeof projectContent?.vidURL === "string") && (
                          <div className={style["projects-item-media-box-video"]} data-loaded={isVideoSnapshotLoaded}>
                            <video onCanPlay={() => setVideoSnapshotLoadState(true)} controls={false} controlsList={"nodownload nofullscreen noremoteplayback"} disablePictureInPicture disableRemotePlayback loop muted autoPlay playsInline preload={"auto"}>
                              {
                                projectContent.vidURL.endsWith(".webm") && (
                                  <source src={projectContent.vidURL} type="video/webm" />
                                )
                              }
                            </video>
                          </div>
                        )
                      }
                    </div>

                    <div className={style["projects-item-image-title"]}>
                      {
                        projectContent?.hidden === true && (
                          <p>Hidden</p>
                        )
                      }

                      <Flex gap={"md"} align={"center"}>
                        <h1>{projectContent.name}</h1>

                        {
                          (selectedProjectIndex === projectIndex && typeof projectContent?.vidURL === "string" && isVideoSnapshotLoaded !== true) && (
                            <Loader color={"white"} size={"xs"}/>
                          )
                        }
                      </Flex>
                    </div>
                  </div>
                </div>

                {/* an arrow to visit the project (pc only; on mobile, user's just have to click the "box") */}
                {
                  (typeof projectContent?.url === "string" && windowWidth > 768) && (
                    <Link href={projectContent.url} target={"_blank"}>
                      <div className={style["projects-item-visit-root"]}>
                        <RightArrow />
                      </div>
                    </Link>
                  )
                }
              </div>

              {/* project details (will be expanded if the user's click the "box") */}
              <div className={style["projects-item-details"]} style={{ maxHeight: selectedProjectIndex === projectIndex ? `${maxHeightSelectedProject}px` : undefined }}>
                {/* project's description */}
                {
                  typeof projectContent?.description === "string" && (
                    <div className={style["projects-item-details-description"]}>
                      <p>{projectContent.description}</p>
                    </div>
                  )
                }

                {/* project's grid, contains information such as year release and stuff */}
                <section className={style["projects-item-details-info-root"]}>
                  {/* project's type */}
                  <div className={style["projects-item-details-info"]}>
                    <h6>Project Type</h6>
                    <p>{projectContent.type}</p>
                  </div>

                  {/* project's year release */}
                  {
                    typeof projectContent?.yearRelease === "number" && (
                      <div className={style["projects-item-details-info"]}>
                        <h6>Year Release</h6>
                        <p>{projectContent.yearRelease}</p>
                      </div>
                    )
                  }

                  {/* project's state */}
                  {
                    typeof projectContent?.projectState === "string" && (
                      <div className={style["projects-item-details-info"]}>
                        <h6>State</h6>
                        <p>{projectContent.projectState}</p>
                      </div>
                    )
                  }

                  {/* credits */}
                  {
                    Array.isArray(projectContent?.credits) && (
                      <div className={style["projects-item-details-info"]}>
                        <h6>Credits</h6>
                        <p>
                          {
                            projectContent.credits
                            .map((credit, creditIndex) => (
                              <Fragment key={creditIndex}>
                                <Link href={credit.url} target={"_blank"} data-reduce-opacity-on-hover>
                                  {credit.name}
                                </Link>
                                
                                {(Array.isArray(projectContent.credits) && creditIndex < projectContent.credits.length - 1) && ', '}
                              </Fragment>
                            ))
                          }
                        </p>
                      </div>
                    )
                  }
                </section>

                {/* project's youtube embed */}
                {
                  ((typeof selectedProjectIndex === "number" ? selectedProjectIndex : delayedProjectSelectionIndex) === projectIndex && typeof projectContent?.ytVidId === "string") && (
                    <section className={style["projects-item-youtube-embed-root"]}>
                      <iframe src={`https://www.youtube-nocookie.com/embed/${projectContent.ytVidId.startsWith("PL") ? `videoseries?list=${projectContent.ytVidId}&rel=0` : projectContent.ytVidId + "?rel=0"}`} referrerPolicy="strict-origin-when-cross-origin" />
                    </section>
                  )
                }

                {/* project visit button (mobile/tablet only) */}
                {
                  (typeof projectContent?.url === "string" && windowWidth <= 768) && (
                    <div className={style["projects-item-visit-super"]}>
                      <Link href={projectContent.url} target={"_blank"}>
                        <div className={style["projects-item-visit-root"]}>
                          <h1>Visit</h1>

                          <RightArrow />
                        </div>
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          ))
        }
      </section>
    </section>
  )
};