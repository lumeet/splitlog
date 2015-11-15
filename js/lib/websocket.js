export default function(callback) {
  var ws = app.config.webSocket('ws://localhost:3333/websocket');
  ws.onmessage = (event) => callback(event)
  return ws;
}
