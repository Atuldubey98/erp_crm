import Header from "../common/Header";
import MainNavLinksList from "../common/MainNavLinksList";
import LeftSideLayout from "./LeftSideLayout";
export type MainLayoutProps = {
  children: React.JSX.Element | React.JSX.Element[];
  topNav?: React.JSX.Element;
  headerChildren?: React.JSX.Element;
};
export default function MainLayout({
  children,
  topNav,
  headerChildren,
}: MainLayoutProps) {
  return (
    <main className="flex dark:bg-slate-900 dark:text-white">
      <LeftSideLayout>
        <MainNavLinksList />
      </LeftSideLayout>
      <section className="w-full h-screen overflow-scroll">
        {topNav}
        <Header>{headerChildren}</Header>
        {children}
      </section>
    </main>
  );
}
