import $ from 'jquery';
import color from 'color-generator';

const parseData = function(event) {
  return JSON.parse(event.data);
};

const colorize = function(groupId) {
  return ensureGroup(groupId).color;
};

const leftPosition = function(groupId) {
  return ensureGroup(groupId).index * 20;
}

const ensureGroup = function(groupId) {
  if (groups[groupId] === undefined) {
    groups[groupId] = { index: groupTotal,
                        color: color().hexString() };
    groupTotal += 1;
  }

  return groups[groupId];
}

let groupTotal = 0;
let groups = {};
let colors = [];

export default function(event) {
  const data = parseData(event);
  if (!data.group) { return; }

  const $line = $('<div class="line"><div class="boxes"><div class="box"></div></div></div>');
  const $box = $line.find('.box');

  $box.css('background-color', colorize(data.group));
  $box.css('margin-left', leftPosition(data.group));
  $('body').append($line);
  $('<span></span>').text(data.text).appendTo($line);

  window.scrollTo(0, document.body.scrollHeight);
};
