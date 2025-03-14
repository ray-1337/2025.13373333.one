import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Flex, Badge, Image } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

const Menu = dynamic(() => import("./Menu"));
const Socials = dynamic(() => import("./Socials"));

import style from "@/styles/components/Biography.module.css";

export default function Biography() {
  const [introState, setIntroState] = useState<boolean>(false);
  const [vacationState, setVacationState] = useState<PartialUserStatus | null>(null);
  const { width: windowWidth } = useViewportSize();

  useEffect(() => {
    const removeTransition = () => {
      setIntroState(false);
    };

    setTimeout(() => setIntroState(true), 500);

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", removeTransition);
    };

    const fetchVacationState = async () => {
      const req = await fetch("/api/vacation-check", {
        mode: "cors", cache: "default", referrerPolicy: "strict-origin", method: "GET"
      });

      if (req.status !== 200) return;

      const json = await req.json() as { state: PartialUserStatus | null };

      if (json.state !== null && json.state?.expiresAt !== null) {
        const language: string = typeof window !== "undefined" ? window.navigator.language : "en-US";
        
        json.state.expiresAt = new Date(json.state.expiresAt).toLocaleDateString(language, { dateStyle: "medium" });
      };

      setVacationState(json?.state || null);
    };

    fetchVacationState();

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", removeTransition);
      };
    };
  }, []);

  return (
    <section className={style["biography-root"]} data-rendered={introState}>
      {/* upper section */}
      <section className={style["biography-upper"]}>
        {/* profile picture */}
        <div className={style["biography-pfp"]}>
          <Image alt={"A profile picture of me."} src={"https://saint-chroma.cdn.13373333.one/0001/personal/myself/0003.webp"} width={96} height={96}/>
        </div>

        {/* bio text */}
        <div className={style["biography-text"]}>
          {
            (vacationState !== null && (vacationState.message === "On vacation" || vacationState.limitedAvailability === true)) && (
              <Flex data-provider={"github.com"}>
                <Badge color={"gray"} variant={"default"}>
                  {
                    `${windowWidth > 600 ? "Currently" : ""} ${vacationState.message === "On vacation" ? "on vacation" : (vacationState.limitedAvailability === true ? "busy" : "not available")} ${vacationState.expiresAt !== null ? `until ${vacationState.expiresAt}` : ""}`
                  }
                </Badge>
              </Flex>
            )
          }

          <p>
            Hi, I am Ray. I am an indepedent full-stack developer.

            <br />
            I do create websites, and in my free time, I play some games.
          </p>
        </div>

        {/* menu list */}
        <div className={style["biography-menu-root"]}>
          <Menu />
        </div>
      </section>

      {/* lower section, mostly just social media icons */}
      <section className={style["biography-lower"]}>
        <Socials />
      </section>
    </section>
  );
};