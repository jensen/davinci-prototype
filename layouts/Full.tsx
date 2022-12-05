import Header from "components/Header";

import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full">
        <Header />
      </div>
      <main className="flex-grow pt-36">{props.children}</main>
    </div>
  );
}
