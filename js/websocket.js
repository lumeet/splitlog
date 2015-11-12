export default function(callback) {
  var ws = new WebSocket('ws://localhost:3333/websocket');
  ws.onmessage = function(event) {
    callback(event);
  }
}
