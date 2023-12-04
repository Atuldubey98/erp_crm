import MainNavLinksList from "../common/MainNavLinksList";
import PrivateRoute from "../common/PrivateRoute";
import MainLayout from "./MainLayout";
import MainTopNavLayout from "./MainTopNavLayout";

export default function PrivateMainLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <PrivateRoute>
      <MainLayout
        topNav={
          <MainTopNavLayout>
            <MainNavLinksList />
          </MainTopNavLayout>
        }
      >
        {children}
      </MainLayout>
    </PrivateRoute>
  );
}
