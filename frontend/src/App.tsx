import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsContextProvider from "./contexts/SettingsContextProvider";
import AuthenticationPage from "./features/auth";
import CustomersPage from "./features/customers";
import CustomerFormPage from "./features/customers/CustomerFormPage";
import CustomerPage from "./features/customers/CustomerPage";
import DashboardPage from "./features/dashboard";
import LandingPage from "./features/landing";
import QuotesPage from "./features/quotes";
import QuoteFormPage from "./features/quotes/NewQuoteFormPage";
import SetupPage from "./features/setup";
import QuotePage from "./features/quotes/QuotePage";
export default function App() {
  return (
    <SettingsContextProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers">
          <Route path="" element={<CustomersPage />} />
          <Route path="new" element={<CustomerFormPage />} />
          <Route path=":customerId/edit" element={<CustomerFormPage />} />
          <Route path=":customerId" element={<CustomerPage />} />
        </Route>
        <Route path="/quotes">
          <Route path="" element={<QuotesPage />} />
          <Route path="new" element={<QuoteFormPage />} />
          <Route path=":quoteId/edit" element={<QuoteFormPage />} />
          <Route path=":quoteId" element={<QuotePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </SettingsContextProvider>
  );
}
