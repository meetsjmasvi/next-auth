export const delay = async (seconds = 1) => {
  return new Promise((resolveOuter) => {
    resolveOuter(
      new Promise((resolveInner) => {
        setTimeout(resolveInner, seconds * 1000);
      })
    );
  });
};
