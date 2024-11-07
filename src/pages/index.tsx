import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


// style
import style from "@/styles/components/Primary.module.css";

const Biography = dynamic(() => import("@/components/Biography"), { ssr: false });
const Interface = dynamic(() => import("@/components/Interface"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });

export default function MainPage() {
  const [menuState, setMenuState] = useState<string | null>(null);


  return (
    <section className={style["main-root"]}>
      <MenuContext.Provider value={[menuState, setMenuState]}>
        <section className={style["main-insider-root"]}>
          {/* biography */}
          <Biography />
        </section>

        <Interface active={menuState !== null}>
          {
            menuState === "projects" && <Projects />
          }
        </Interface>
      </MenuContext.Provider>
    </section>
  );
};