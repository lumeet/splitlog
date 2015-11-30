import test from 'tape';
import reporter from '../lib/reporter';
import $ from 'jquery';

const clearBody = function() {
  $('body').html('');
};

test('skipping undefined groups', (t) => {
  t.plan(1);
  clearBody();
  reporter({ data: '{"text": "hello", "group": null}' });
  t.equal($('div').length, 0, 'does not display anything');
});

test('adding a log line to a new group', (t) => {
  t.plan(1);
  clearBody();
  reporter({ data: '{"text": "hello", "group": 1}' });
  reporter({ data: '{"text": "hello", "group": 2}' });
  const firstColor = $('div:first-child .box').css('background-color');
  const secondColor = $('div:last-child .box').css('background-color');
  t.equal(firstColor === secondColor, false, 'colors do not match');
});

test('adding a log line to an existing group', (t) => {
  t.plan(1);
  clearBody();
  reporter({ data: '{"text": "hello", "group": 1}' });
  reporter({ data: '{"text": "hello", "group": 1}' });
  const firstColor = $('div:first-child .box').css('background-color');
  const secondColor = $('div:last-child .box').css('background-color');
  t.equal(firstColor === secondColor, true, 'colors match');
});
