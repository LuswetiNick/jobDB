import arcjet, {
  detectBot,
  fixedWindow,
  tokenBucket,
  shield,
  slidingWindow,
} from "@arcjet/next";

export { detectBot, fixedWindow, tokenBucket, shield, slidingWindow };
export default arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [],
});
