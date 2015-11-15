import test from 'tape';
import app from './app';
import websocket from '../lib/websocket';

window.app = app;

test('websocket', (t) => {
  const ws = websocket((event) => {
    t.equal(event, 'hello');
    t.end();
  });
  ws.onmessage('hello');
});
