import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-xl mx-auto">
		{children}
    </div>
  );
};

export default Layout;
