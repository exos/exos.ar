import VerifyHuman from "../page";

export default async function VerifyAndGotoPage({
  params,
}: {
  params: Promise<{ goto: string }>;
}) {
  let { goto } = await params;

  if (typeof goto !== "string") {
    goto = "";
  }

  return <VerifyHuman goto={goto} />;
}
