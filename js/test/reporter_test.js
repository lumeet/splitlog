import test from 'tape';
import reporter from '../lib/reporter';
import $ from 'jquery';

test('adding a log line to DOM', (t) => {
  t.plan(1)
  reporter({ data: '{"text": "hello"}' });
  t.equal($('div:last-child').text(), 'hello');
});

test('adding a log line to a new group', (t) => {
  t.plan(1)
  reporter({ data: '{"text": "hello", "group": 1}' });
  reporter({ data: '{"text": "hello", "group": 2}' });
  const firstColor = $('div:first-child .box').css('background-color');
  const secondColor = $('div:last-child .box').css('background-color');
  t.equal(firstColor === secondColor, false, 'colors do not match');
});

test('adding a log line to an existing group', (t) => {
  t.plan(1)
  reporter({ data: '{"text": "hello", "group": 1}' });
  reporter({ data: '{"text": "hello", "group": 1}' });
  const firstColor = $('div:first-child .box').css('background-color');
  const secondColor = $('div:last-child .box').css('background-color');
  t.equal(firstColor === secondColor, false, 'colors match');
});
