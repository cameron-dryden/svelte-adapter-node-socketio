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

Now you have a Socket.IO server that runs with the SvelteKit app. You can access the Socket.IO server by using the `ready()` function which is a promise that will return the Socket.IO Server instance when it has been initialized. You can also access the Socket.IO server by using the `global.socketio.io` variable which will be set once the server is initialized.

#### `hooks.server.ts`

```javascript
import type { ServerInit } from '@sveltejs/kit';
import { ready } from "svelte-adapter-node-socketio";
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./types";


export const init: ServerInit = async () => {
    ready<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >().then(io => {
        io.on("connection", (socket) => {
            socket.on("name", async (name) => {
                socket.data.name = name;

                io.emit("message", {
                    author: "",
                    text: `👋 ${name} has entered the chat`,
                    bot: true,
                });
            });

            socket.on("disconnect", () => {
                io.emit("message", {
                    author: "",
                    text: `🏃‍♀️ ${socket.data.name} has left the chat`,
                    bot: true,
                });
            });
        })
    })
};

```
