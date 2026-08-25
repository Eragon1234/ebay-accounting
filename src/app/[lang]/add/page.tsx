import Link from "next/link";
import { getLocalization } from "@/translation/dictionaries";
import { BanknoteArrowDownIcon, BanknoteArrowUpIcon } from "lucide-react";

export default async function Add(props: PageProps<"/[lang]/add">) {
  const params = await props.params;
  const localization = getLocalization(params.lang);
  const { dict } = localization;

  return (
    <>
      <h1>{dict.add.createNew}</h1>
      <Link href="/new-income" className="card add-option">
        <BanknoteArrowUpIcon />
        {dict.add.income}
      </Link>
      <Link href="/new-expense" className="card add-option">
        <BanknoteArrowDownIcon />
        {dict.add.expense}
      </Link>
    </>
  );
}
