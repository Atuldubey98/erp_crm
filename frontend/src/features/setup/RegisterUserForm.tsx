type RegisterUserFormProps = {
  onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: RegisterUserProps;
};
export default function RegisterUserForm({
  user,
  onChangeUser,
}: RegisterUserFormProps) {
  return (
    <>
      <div className="flex align-center flex-wrap gap-2">
        <label className="block flex-1">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            First Name
          </span>
          <input
            type="text"
            required
            minLength={3}
            maxLength={50}
            value={user.firstName}
            onChange={onChangeUser}
            name="firstName"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="First Name"
          />
        </label>
        <label className="block flex-1">
          <span className="block text-sm font-medium text-slate-700">
            Middle Name
          </span>
          <input
            type="text"
            minLength={3}
            maxLength={30}
            value={user.maidenName}
            name="maidenName"
            onChange={onChangeUser}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Middle Name"
          />
        </label>
        <label className="block flex-1">
          <span className="block text-sm font-medium text-slate-700">
            Last Name
          </span>
          <input
            type="text"
            minLength={3}
            maxLength={30}
            value={user.lastName}
            onChange={onChangeUser}
            name="lastName"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Last Name"
          />
        </label>
      </div>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Email
        </span>
        <input
          type="email"
          required
          minLength={3}
          maxLength={50}
          name="email"
          value={user.email}
          onChange={onChangeUser}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="you@example.com"
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          required
          minLength={8}
          maxLength={20}
          type="password"
          name="password"
          onChange={onChangeUser}
          value={user.password}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Password"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          Phone Number
        </span>
        <input
          minLength={10}
          maxLength={12}
          onChange={onChangeUser}
          value={user.phoneNumber}
          type="tel"
          name="phoneNumber"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Phone Number"
        />
      </label>
    </>
  );
}
