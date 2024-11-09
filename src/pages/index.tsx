import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// context
import MenuContext from "@/contexts/Menu";

// style
import style from "@/styles/components/Primary.module.css";

const Biography = dynamic(() => import("@/components/Biography"), { ssr: false });
const Interface = dynamic(() => import("@/components/Interface"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Porter = dynamic(() => import("@/components/Porter"), { ssr: false });

export default function MainPage() {
  const [menuState, setMenuState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = "var(--authenticDarkColor001)";
    };

    const resetMenuState = () => setMenuState(null);

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", resetMenuState);
    };

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", resetMenuState);
      };
    };
  }, []);

  return (
    <section className={style["main-root"]}>
      <MenuContext.Provider value={[menuState, setMenuState]}>
        <section className={style["main-insider-root"]}>
          {/* biography */}
          <Biography />

          <Porter />
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