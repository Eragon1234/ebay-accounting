import { getLocalization } from "@/translation/dictionaries";
import { redirect } from "next/navigation";
import { signInAction } from "@/app/[lang]/login/server-actions";

export default async function Login(props: PageProps<"/[lang]/login">) {
  if (process.env.DISABLE_AUTH) {
    redirect("/");
  }

  const params = await props.params;
  const localization = getLocalization(params.lang);

  const { dict } = localization;

  return (
    <form action={signInAction}>
      <label htmlFor="password">{dict.login.password}</label>
      <input type="password" name="password" id="password" />
      <button className="button" type="submit">
        {dict.login.submit}
      </button>
    </form>
  );
}
