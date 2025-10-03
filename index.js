/** @type {import('./index.js').ready} */
export function ready() {
  if (!global.socketio) throw new Error("Socket.IO has not been initialized");

  return global.socketio.ready();
}
