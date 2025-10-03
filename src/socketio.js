/**
 * @type {(value: any) => void}
 */
let _socketIoResolve;
const _socketIoReady = new Promise((res) => (_socketIoResolve = res));

global.socketio = {
  ready: () => _socketIoReady,
  // @ts-ignore
  io: null,
};

export function socketIOReady() {
  _socketIoResolve(global.socketio.io);
}
