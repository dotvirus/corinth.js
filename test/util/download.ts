import { createWriteStream, ReadStream } from "fs";

export function downloadStream(
  source: ReadStream,
  output: string,
): Promise<void> {
  return new Promise((done, reject) => {
    const writer = createWriteStream(output);
    writer.on("error", (err) => {
      console.error(err);
      reject();
    });
    writer.on("close", done);
    source.pipe(writer);
  });
}
