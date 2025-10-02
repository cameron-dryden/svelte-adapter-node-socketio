# svelte-adapter-node-socketio

[Adapter](https://svelte.dev/docs/kit/adapters) for SvelteKit apps that generates a standalone Node server which serves the SvelteKit app and a SocketIO server.

## Usage

First you need to make sure you that your `svelte.config.js` and your `vite.config.ts` files are using the adapter.

#### `svelte.config.js`

```javascript
import adapter from "svelte-adapter-node-socketio/adapter";
// other imports

const config = {
  // ...
  kit: {
    adapter: adapter(),
    // ...
  },
};

export default config;
```

#### `vite.config.ts`

```javascript
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import socketio from "svelte-adapter-node-socketio/plugin";

const config: UserConfig = {
  plugins: [sveltekit(), socketio()],
};

export default config;
```

Now you have a Socket.IO server that runs with the SvelteKit app. You can access the Socket.IO server by using the `global.io` variable which will be set once the server is listening.

#### `hooks.server.ts`

```javascript
import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = async () => {
  // TODO: Figure out better way to do this (when server is listening, this needs to run)
  setTimeout(() => {
    if (global.io) {
      console.log("Socket.IO initialized");

      global.io.on("connection", (socket) => {
        socket.on("message", (message) => {
          global.io.emit("message", { ...message, bot: false });
        });

        socket.on("disconnect", () => {
          global.io.emit("message", {
            author: "",
            text: `🏃‍♀️ ${socket.data.name} has left the chat`,
            bot: true,
          });
        });
      });
    } else {
      console.log("Socket.IO not initialized");
    }
  }, 1000);
};
```
