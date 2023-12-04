import logo from "../../assets/organization.svg";
import adminLogo from "../../assets/admin.svg";
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
export type LeftSideLayoutProps = {
  children: React.JSX.Element | React.JSX.Element[];
};
export default function LeftSideLayout({ children }: LeftSideLayoutProps) {
  const auth = useAuth();
  const name = auth.user?.firstName;
  const settings = useSettings();

  return (
    <nav className="w-80 flex flex-col justify-between border-r-2 border-emerald-500 h-screen overflow-scroll hidden md:flex">
      <div className="p-2 flex flex-col border-b-2 border-emerald-500 justify-center items-center gap-2">
        {settings && settings.companySettings ? (
          <h1 className="text-2xl font-bold text-center">
            {settings.companySettings.name}
          </h1>
        ) : null}
        <img src={logo} alt="SRRE" width={100} height={100} />
      </div>
      {children}
      <div className="flex items-center border-t-emerald-500 border-t-2 justify-center gap-2 p-2">
        <img src={adminLogo} alt="SRRE" width={60} height={60} />
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
    </nav>
  );
}
