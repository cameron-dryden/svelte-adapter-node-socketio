import './ambient.js';
import { DefaultEventsMap, Server } from 'socket.io';
import { EventsMap } from 'node_modules/socket.io/dist/typed-events.js';

export function ready<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents, ServerSideEvents extends EventsMap = DefaultEventsMap, SocketData = any>(): Promise<Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>>;
