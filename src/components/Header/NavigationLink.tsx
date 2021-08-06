import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
  text: string;
}

const NavigationLink: FC<Props> = ({ href, text }) => {
  const { pathname } = useRouter();

  return (
    <Link href={href}>
      <a className={pathname === href ? "color_primary" : ""}>{text}</a>
    </Link>
  );
};

export default NavigationLink;
