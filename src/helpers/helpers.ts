import { Readable } from "stream";

function camelCaser(word: string, index: number) {
  let firstLetter;
  if (index) {
    firstLetter = word[0].toUpperCase();
  } else {
    firstLetter = word[0].toLowerCase();
  }
  if (word.length > 1) {
    const otherLetters = word.slice(1);
    return firstLetter + otherLetters;
  } else {
    return firstLetter;
  }
}

function range(start: number, end: number) {
  const arr = [];

  for (let i = start; i <= end; i += 1) {
    arr.push(i);
  }
  return arr;
}

const streamToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

export { camelCaser, range, streamToString };
