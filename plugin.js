import { Server } from "socket.io";

/** @type {import('./plugin.js').default} */
export default function () {
  return {
    name: "socket.io plugin",
    /** @param {import('vite').ViteDevServer} server */
    configureServer(server) {
      // @ts-ignore
      if (global.io) return;
      // @ts-ignore
      global.io = new Server(server.httpServer);
    },
  };
}
