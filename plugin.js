import { Server } from "socket.io";

/** @type {import('./plugin.js').default} */
export default function () {
  return {
    name: "socket.io plugin",
    /** @param {import('vite').ViteDevServer} server */
    configureServer(server) {
      if (global.socketio) return;

      global.socketio = {
        ready: () => Promise.resolve(global.socketio.io),
        // @ts-ignore
        io: new Server(server.httpServer),
      };
    },
  };
}
