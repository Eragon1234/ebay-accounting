"use server";

import {randomUUID} from 'crypto';
import path from "path";
import fs from "fs";

export async function saveFile(file: File): Promise<string> {
    const filePath = path.join('/files', randomUUID());
    if (fs.existsSync(filePath)) {
        return saveFile(file);
    }

    const arrayBuffer = await file.arrayBuffer();

    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    return filePath;
}