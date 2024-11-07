import { useState } from "react";
import Link from "next/link";

import Socials from "@/config/Socials";

import style from "@/styles/components/Biography.module.css";

const obfuscatedEmail = btoa("personal@13373333.one");

export default function SocialsComponent() {
  const [hovered, setHoverState] = useState<boolean>(false);

  return (
    <div className={style["biography-socials-root"]}>
      {
        Socials.map((social, socialIndex) => (
          <div className={style["biography-socials-item"]} key={socialIndex}>
            <Link href={social.url} target={"_blank"} title={social.url}>
              <img alt={"An icon of Ray's social media."} src={social.iconURL} crossOrigin={"anonymous"} />
            </Link>
          </div>
        ))
      }

      {/* email */}
      <div className={style["biography-socials-item"]} onMouseOver={() => setHoverState(true)} onTouchStart={() => setHoverState(true)}>
        <Link href={hovered === true ? `mailto:${atob(obfuscatedEmail)}` : "#"} target={"_blank"}>
          <img alt={"An icon of Ray's personal email."} src={"https://cdn.simpleicons.org/gmail/white"} crossOrigin={"anonymous"} />
        </Link>
      </div>
    </div>
  )
};