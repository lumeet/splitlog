import app from './app';
import reporter from './reporter';
import ws from './websocket';

window.app = app;

ws(reporter);
