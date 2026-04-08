const listeners = new Set();

export const onUserRefreshed = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const emitUserRefreshed = (user) => {
  listeners.forEach((cb) => cb(user));
};
