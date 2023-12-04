import lockIcon from "../../assets/lock.svg";
import useLoginForm from "../../hooks/useLoginForm";
export default function AuthenticationPage() {
  const { onChangeUser, user, loading, onSubmitLoginForm } = useLoginForm();
  const isFormValid = !user.email || !user.password;
  return (
    <main className="h-screen flex gap-3  justify-center flex-col w-full dark:bg-slate-900">
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900">
        <img src={lockIcon} alt="Admin lock" width={100} height={100} />
      </div>
      <section className="flex mx-auto align-center justify-center w-full max-w-sm bg-slate">
        <form
          className="grid gap-2 w-full border-2 p-3 rounded"
          onSubmit={onSubmitLoginForm}
        >
          <h1 className="text-2xl text-center font-bold dark:text-white">
            Login to your account
          </h1>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 dark:text-white">
              Email
            </span>
            <input
              value={user.email}
              disabled={loading}
              onChange={onChangeUser}
              type="email"
              required
              minLength={3}
              maxLength={30}
              name="email"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1 dark:bg-slate-900 dark:text-white"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 dark:text-white">
              Password
            </span>
            <input
              required
              value={user.password}
              disabled={loading}
              onChange={onChangeUser}
              minLength={8}
              maxLength={20}
              type="password"
              name="password"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 block w-full rounded-md sm:text-sm focus:ring-1 dark:bg-slate-900 dark:text-white"
              placeholder="Password"
            />
          </label>
          <div className="flex align-center justify-center">
            <button
              disabled={loading || isFormValid}
              className="disabled:opacity-70 rounded p-1 text-white font-semibold bg-emerald-500 mx-auto"
            >
              Login
            </button>
          </div>
          <p className="italic text-sm text-center text-slate-600 dark:text-slate-200">
            Note: Contact adminstrator to get registered
          </p>
        </form>
      </section>
      <div className=" bg-gradient-to-r from-emerald-800 to-slate-900 flex align-center justify-end">
        <img src={lockIcon} alt="Admin lock" width={100} height={100} />
      </div>
    </main>
  );
}
