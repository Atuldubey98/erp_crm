import logo from "../../assets/organization.svg";
import burgerLogo from "../../assets/burger.svg";
import { useState } from "react";
import useSettings from "../../hooks/useSettings";
export type MainTopNavLayoutProps = {
  children: React.JSX.Element | React.JSX.Element[];
};
export default function MainTopNavLayout({ children }: MainTopNavLayoutProps) {
  const [open, setOpen] = useState(false);
  const settings = useSettings();

  return (
    <nav className="md:hidden">
      <div className="flex items-center justify-between p-2">
        <img
          src={burgerLogo}
          alt="burger icon"
          onClick={() => setOpen(!open)}
          width={30}
        />
        {settings && settings.companySettings ? (
          <h1 className="text-xl font-bold">{settings.companySettings.name}</h1>
        ) : null}
        <img src={logo} alt="SRRE" width={60} height={60} />
      </div>
      {open ? children : false}
    </nav>
  );
}
