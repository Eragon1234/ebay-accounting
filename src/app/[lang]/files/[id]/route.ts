import {notFound} from "next/navigation";
import {getCloudflareContext} from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function GET(request: Request, ctx: RouteContext<'/[lang]/files/[id]'>) {
  const params = await ctx.params;
  const bucket = getCloudflareContext().env.BUCKET;
  const filename = params.id;

  const file = await bucket.get(filename);

  if (!file) {
    notFound();
  }

  return new Response(await file.arrayBuffer());
}
