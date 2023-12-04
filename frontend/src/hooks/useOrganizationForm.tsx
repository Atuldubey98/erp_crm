import { ChangeEvent, useState } from "react";

export default function useOrganizationForm() {
  const [organization, setOrganization] = useState<ICompanyDetailsCreateBody>({
    name: "",
    address: "",
    isGSTApplicable: false,
    gstNo: "",
    type: "company",
    panNo: "",
  });
  function onChangeOrganization(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setOrganization({
      ...organization,
      [name]:
        name === "isGSTApplicable" ? !organization.isGSTApplicable : value,
    });
  }
  const onSetOrganizationForm = (newOrganization: ICompanyDetails) => {
    setOrganization({
      ...newOrganization,
      isGSTApplicable: (newOrganization.gstNo || "").length === 0,
    });
  };
  return { onChangeOrganization, organization, onSetOrganizationForm };
}
