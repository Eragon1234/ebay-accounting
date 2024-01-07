import path from "path";
import fs from "fs/promises";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    const filePath = path.join("/files", params.id);

    let file;
    try {
        file = await fs.readFile(filePath);
    } catch (e) {
        notFound();
    }

    return new Response(file);
}