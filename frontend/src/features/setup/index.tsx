import { useState } from "react";
import settingsApi from "../../api/settings.api";
import structLogo from "../../assets/struct-logo.svg";
import useOrganizationForm from "../../hooks/useOrganizationForm";
import useSeriesForm from "../../hooks/useSeriesForm";
import useTab from "../../hooks/useTab";
import useUserRegisterForm from "../../hooks/useUserRegisterForm";
import FormHeader from "./FormHeader";
import OrganzationForm from "./OrganzationForm";
import RegisterUserForm from "./RegisterUserForm";
import StartingSeriesForm from "./StartingSeriesForm";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { register } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import SettingsRouteWrapper from "../common/SettingsRouteWrapper";
export enum Settings {
  COMPANY = "company",
  ADMIN = "admin",
  SERIES = "series",
}
export default function SetupPage() {
  const [status, setStatus] = useState<IApiStatus>("idle");
  const disbaled = status === "loading";
  const { organization, onChangeOrganization } = useOrganizationForm();
  const { user, onChangeUser } = useUserRegisterForm();
  const { series, onSetSeriesType } = useSeriesForm();
  const navigate = useNavigate();
  const tabs = [
    {
      type: Settings.COMPANY,
      header: <FormHeader tabIndex={0} />,
      children: (
        <OrganzationForm
          disabled={disbaled}
          organization={organization}
          onChangeOrganization={onChangeOrganization}
        />
      ),
      onSubmit: onSubmitOrganizationForm,
    },
    {
      type: Settings.SERIES,
      header: <FormHeader tabIndex={1} />,
      children: (
        <StartingSeriesForm series={series} onSetSeriesType={onSetSeriesType} />
      ),
      onSubmit: onSubmitSeriesForm,
    },
    {
      type: Settings.ADMIN,
      header: <FormHeader tabIndex={2} />,
      children: <RegisterUserForm user={user} onChangeUser={onChangeUser} />,
      onSubmit: onSubmitAdminRegisterForm,
    },
  ];
  const { onClickNext, onClickPrevious, tabIndex } = useTab(tabs.length);
  async function onSubmitOrganizationForm(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      setStatus("loading");
      await settingsApi.saveCompanyDetails(organization);
      onClickNext();
      toast.success("Company details saved");
      setStatus("succeeded");
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data.message : "Error occured"
      );
      setStatus("failed");
    }
  }
  async function onSubmitSeriesForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setStatus("loading");
      await Promise.all([
        settingsApi.saveInvoiceSettings({
          seriesType: series.invoiceSeriesType,
          value: series.invoice,
          type: "invoice",
        }),
        settingsApi.saveQuoteSettings({
          seriesType: series.quoteSeriesType,
          value: series.quote,
          type: "quote",
        }),
      ]);
      toast.success("Series created");
      setStatus("succeeded");
      onClickNext();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data.message : "Error occured"
      );
      setStatus("failed");
    }
  }
  async function onSubmitAdminRegisterForm(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      setStatus("loading");
      const { data } = await register(user);
      await settingsApi.saveSetupAdminSettings({ type: Settings.ADMIN });
      setStatus("succeeded");
      toast.success(data.message);
      setTimeout(() => {
        navigate("/auth", { replace: true });
      }, 500);
    } catch (error) {
      setStatus("failed");
      toast.error(
        isAxiosError(error) ? error.response?.data.message : "Error occured"
      );
    }
  }
  return (
    <SettingsRouteWrapper>
      <main className="flex">
        <section className="bg-white h-screen flex-1 p-6">
          {tabs[tabIndex].header}
          <form
            onSubmit={tabs[tabIndex].onSubmit}
            className="grid gap-2 max-w-xl"
          >
            {tabs[tabIndex].children}
            <div className="flex align-center justify-between">
              <button
                type="button"
                disabled={tabIndex === 0}
                onClick={onClickPrevious}
                className="bg-cyan-900 hover:bg-cyan-800 text-white p-1 rounded"
              >
                Previous
              </button>
              {tabIndex === tabs.length - 1 ? (
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-1 rounded"
                >
                  Finish
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-1 rounded"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </section>
        <section className="bg-emerald-500 flex flex-1 align-center justify-center hidden md:block">
          <img
            className="p-2"
            src={structLogo}
            alt="Struct logo"
            width={350}
            height={350}
          />
        </section>
      </main>
    </SettingsRouteWrapper>
  );
}
