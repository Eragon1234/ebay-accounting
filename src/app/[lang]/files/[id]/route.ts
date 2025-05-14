import { notFound } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const bucket = process.env.BUCKET;
  const filename = params.id;

  const file = await bucket.get(filename);

  if (!file) {
    notFound();
  }

  return new Response(await file.arrayBuffer());
}
