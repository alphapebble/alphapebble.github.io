export const DEBUG = process.env.NEXT_DEBUG_LOGS === "1";
export const dlog = (...args: unknown[]) => { if (DEBUG) console.log(...args); };
