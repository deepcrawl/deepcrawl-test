import pino from "pino";

export const loggerService = pino({
  level: "info",
  prettyPrint: true,
});
