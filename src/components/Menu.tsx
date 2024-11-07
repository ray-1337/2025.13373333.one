import { Fragment, useContext } from "react";

import MenuContext from "@/contexts/Menu";

import style from "@/styles/components/Biography.module.css";

const menus: Array<Record<"name" | "value", string>> = [
  { name: "Projects", value: "projects" }
];

export default function MenuInBio() {
  const [, setMenuState] = useContext(MenuContext);

  return (
    <Fragment>
      {
        menus.map((menu, index) => (
          <div className={style["biography-menu-item"]} key={`${index}-${menu.name}`} onClick={() => setMenuState(menu.value)}>
            <h3>{menu.name}</h3>
          </div>
        ))
      }
    </Fragment>
  )
};