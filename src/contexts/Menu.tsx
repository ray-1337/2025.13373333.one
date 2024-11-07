import { createContext, type Dispatch, type SetStateAction } from "react";

type MenuContextType = string | null;

type MenuContextContextType = [
  MenuContextType,
  Dispatch<SetStateAction<MenuContextType>>,
];

const MenuContext = createContext<MenuContextContextType>([null, () => {}]);

export default MenuContext;