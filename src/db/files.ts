"use server";

export async function saveFile(file: File): Promise<string> {
    const bucket = process.env.BUCKET;
    const filename = crypto.randomUUID();
    if (!await bucket.head(filename)) {
        return saveFile(file);
    }

    const arrayBuffer = await file.arrayBuffer();

    await bucket.put(filename, arrayBuffer);

    return filename;
}