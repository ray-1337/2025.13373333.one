import { type ReactNode, useContext } from "react";
import dynamic from "next/dynamic";

// context
import MenuContext from "@/contexts/Menu";

// media import
const LeftArrow = dynamic(() => import("@/icons/LeftArrow"));

// style
import style from "@/styles/components/Interface.module.css";

interface InterfaceProp {
  children: ReactNode;
  active: boolean;
};

export default function Interface(props: InterfaceProp) {
 const [, setMenuContext] = useContext(MenuContext);

  return (
    <section className={style["interface-root"]} data-active={props?.active || false}>
      {/* close button */}
      <div className={style["interface-close-root"]} onClick={() => setMenuContext(null)}>
        <LeftArrow />
      </div>

      <section className={style["interface-intervention-root"]}>
        {props.children}
      </section>
    </section>
  );
};