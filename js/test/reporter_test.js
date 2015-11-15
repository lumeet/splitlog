import test from 'tape';
import reporter from '../lib/reporter';
import $ from 'jquery';

test('adding a log line to DOM', (t) => {
  reporter({ data: '{"text": "hello"}' });
  t.equal($('div:last-child').text(), 'hello');
  t.end();
});
