import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("./Menu"));
const Socials = dynamic(() => import("./Socials"));

import style from "@/styles/components/Biography.module.css";

export default function Biography() {
  const [introState, setIntroState] = useState<boolean>(false);

  useEffect(() => {
    const removeTransition = () => {
      setIntroState(false);
    };

    setTimeout(() => setIntroState(true), 500);

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", removeTransition);
    };

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
          <Image alt={"A profile picture of me."} src={"/media/ray/legoshi_001.webp"} width={96} height={96} quality={90}/>
        </div>

        {/* bio text */}
        <div className={style["biography-text"]}>
          <p>
            Hi, I am Ray. I am an indepedent full-stack developer.

            <br />
            I do create a website, and in my free time, I tend to play some games and stuff.
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