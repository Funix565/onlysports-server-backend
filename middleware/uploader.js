import {promises} from "fs";
import {stringify} from "querystring";
import {fileURLToPath} from "url";
import path from "path";

const fileToString = (picturePath) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return promises.readFile(path.join(__dirname, '..', 'public', 'assets', picturePath), "base64");
}

// The only working example I've found. ImgBB documentation is poor. It runs and I'm satisfied.
// Link: https://github.com/TheRealBarenziah/imgbb-uploader/blob/46944197cb5735baddd2c7d9838d2e0448222337/src/postToImgbb.ts#L21
export const uploadToImgbb = async (picturePath) => {
    const image = await fileToString(picturePath);
    const payload = stringify({image});

    const response = await fetch(`${process.env.IMGBB_URL}?key=${process.env.IMGBB_KEY}&name=${picturePath}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": payload.length,
        },
        body: payload
    });

    const result = await response.json();
    return result.data.url;
}
