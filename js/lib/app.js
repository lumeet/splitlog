export default {
  config: {
    webSocket: (addr) => { return new WebSocket(addr) }
  }
}
