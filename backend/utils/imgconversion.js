import fs from "fs";

export default function imageToBase64(path) {
  return fs.readFileSync(path).toString("base64");
}
