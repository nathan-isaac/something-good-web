var scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;

export function flushPromises() {
  return new Promise(function(resolve) {
    // @ts-ignore
    scheduler(resolve);
  });
}