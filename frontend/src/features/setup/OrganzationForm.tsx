type OrganzationFormProps = {
  onChangeOrganization: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  organization: ICompanyDetailsCreateBody;
  disabled: boolean;
};
export default function OrganzationForm({
  organization,
  onChangeOrganization,
  disabled,
}: OrganzationFormProps) {
  return (
    <>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          What is the name of your organization?
        </span>
        <input
          disabled={disabled}
          onChange={onChangeOrganization}
          value={organization.name}
          type="text"
          required
          minLength={3}
          maxLength={50}
          name="name"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Name"
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Full address of organization?
        </span>
        <textarea
          disabled={disabled}
          required
          minLength={3}
          maxLength={80}
          name="address"
          value={organization.address}
          onChange={onChangeOrganization}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Address"
        />
      </label>
      <div className="flex align-center flex-wrap gap-2">
        <label className="block flex-1">
          <span className=" block text-sm font-medium text-slate-700">
            Check if GST is applicable
          </span>
          <input
            disabled={disabled}
            type="checkbox"
            name="isGSTApplicable"
            checked={organization.isGSTApplicable}
            onChange={onChangeOrganization}
          />
        </label>
        {organization.isGSTApplicable && (
          <label className="block flex-auto">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              GST Number
            </span>
            <input
              disabled={disabled}
              type="text"
              minLength={12}
              maxLength={15}
              name="gstNo"
              value={organization.gstNo || "".toUpperCase()}
              onChange={onChangeOrganization}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="GST Number"
            />
          </label>
        )}
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          PAN Number
        </span>
        <input
          disabled={disabled}
          required
          type="text"
          minLength={10}
          maxLength={12}
          name="panNo"
          onChange={onChangeOrganization}
          value={organization.panNo || "".toUpperCase()}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="PAN Number"
        />
      </label>
    </>
  );
}
