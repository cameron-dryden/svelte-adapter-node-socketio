import http from 'node:http';
import { Server } from 'socket.io';

declare global {
	var socketio: {
		ready: () => Promise<Server>;
		io: Server;
	};

	namespace App {
		export interface Platform {
			/**
			 * The original Node request object (https://nodejs.org/api/http.html#class-httpincomingmessage)
			 */
			req: http.IncomingMessage;
		}
	}
}
