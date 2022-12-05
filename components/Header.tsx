import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "components/brand/Logo";
import classnames from "classnames";

import type { ReactNode } from "react";

interface HeaderLinkProps {
  path: string;
  children: ({ active }: { active: boolean }) => ReactNode;
}

const HeaderLink = (props: HeaderLinkProps) => {
  const pathname = usePathname();
  const active = pathname === props.path;

  if (pathname?.endsWith("/results")) return null;

  return (
    <li
      className={classnames("border-l-2 border-violet-600 pl-3", {
        "border-violet-600": active && pathname === "/email",
        "border-emerald-500": active && pathname === "/website",
        "border-gray-400": active === false,
      })}
    >
      <Link href={props.path}>{props.children({ active })}</Link>
    </li>
  );
};

interface HeaderTabProps {
  active: boolean;
  label: string;
  byline: string;
}

const HeaderTab = (props: HeaderTabProps) => {
  return (
    <div className="flex flex-col">
      <span
        className={classnames("uppercase font-semibold text-xs", {
          "text-black": props.active === true,
          "text-gray-600": props.active === false,
        })}
      >
        {props.label}
      </span>
      <span
        className={classnames("font-medium text-xs text-black opacity-40", {
          "text-black": props.active === true,
          "text-gray-600": props.active === false,
        })}
      >
        {props.byline}
      </span>
    </div>
  );
};

interface HeaderButtonProps {
  path: string;
  primary: boolean;
  children: ReactNode;
}

const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <li>
      <Link href={props.path}>
        <button className="flex items-center h-8 px-2 rounded-md border">
          <span className="text-sm font-semibold leading-5 inline-block">
            {props.children}
          </span>
        </button>
      </Link>
    </li>
  );
};

HeaderButton.defaultProps = {
  primary: false,
};

export default function Header() {
  return (
    <header className="px-8 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-3 w-36">
        <Logo />
      </Link>
      <ul className="flex space-x-14">
        <HeaderLink path="/email">
          {({ active }) => (
            <HeaderTab
              active={active}
              label="Emails"
              byline="Generate copy for emails"
            />
          )}
        </HeaderLink>
        <HeaderLink path="/website">
          {({ active }) => (
            <HeaderTab
              active={active}
              label="Website"
              byline="Generate copy for websites"
            />
          )}
        </HeaderLink>
      </ul>
      <div className="w-36">
        <Link href="#" className="text-gray-500 font-semibold text-xs">
          Feedback
        </Link>
      </div>
    </header>
  );
}
