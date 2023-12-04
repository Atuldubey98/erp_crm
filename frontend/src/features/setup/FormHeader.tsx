import orgLogo from "../../assets/organization.svg";
import adminLogo from "../../assets/admin.svg";
import invoiceLogo from "../../assets/invoice.svg";

export type FormHeaderProps = {
  tabIndex: number;
};
export default function FormHeader({ tabIndex }: FormHeaderProps) {
  let header;
  const logo: { [type: number]: { url: string; headerText: string } } = {
    0: { url: orgLogo, headerText: "Initial Setup for organization" },
    1: { url: invoiceLogo, headerText: "Select the series" },
    2: { url: adminLogo, headerText: "Register as Admin" },
  };
  header = logo[tabIndex] || {
    url: orgLogo,
    headerText: "Initial Setup for organization",
  };
  return (
    <div className="font-bold text-3xl grid gap-2">
      <img src={header.url} alt="logo" height={60} width={60} />
      <span>{header.headerText}</span>
    </div>
  );
}
