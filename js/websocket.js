export default function() {
  var colors = ['#ffc', '#fcf', '#fcc', '#cff', '#cfc', '#ccf', '#ccc'];
  var ws = new WebSocket('ws://localhost:3333/websocket');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);
    var el = document.createElement('div');
    el.appendChild(document.createTextNode(data.text));
    if (data.group) {
      el.style.backgroundColor = colors[data.group];
    }
    document.body.appendChild(el);
    window.scrollTo(0, document.body.scrollHeight);
  }
}
