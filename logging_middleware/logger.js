export const Log = (stack, level, pkg, message) => {
  console.log({
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString(),
  });
};