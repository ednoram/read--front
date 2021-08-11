import { FC, Fragment } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

import styles from "./Breadcrumbs.module.scss";

type link = { text: string; href: string };

interface Props {
  links: link[];
}

const Breadcrumbs: FC<Props> = ({ links }) => {
  const { asPath } = useRouter();

  return (
    <ul className={styles.list}>
      {links.map(({ text, href }, index) => (
        <Fragment key={nanoid()}>
          {index !== 0 && <li>{` > `}</li>}
          <li>
            <Link href={href}>
              <a className={asPath === href ? "color_primary" : ""}>{text}</a>
            </Link>
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
