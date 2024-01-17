import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    const bucket = process.env.BUCKET;
    const filename = params.id;

    const file = await bucket.get(filename);

    if (!file) {
        notFound();
    }

    return new Response(await file.arrayBuffer());
}