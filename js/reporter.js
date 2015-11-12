import $ from 'jquery'

const colors = ['#ffc', '#fcf', '#fcc', '#cff', '#cfc', '#ccf', '#ccc'];

const parseData = function(event) {
  return JSON.parse(event.data);
};

const colorize = function(group) {
  return colors[group];
};

export default function(event) {
  const data = parseData(event);
  const $el = $('<div></div>').text(data.text);
  
  if (data.group) {
    $el.css('background-color', colorize(data.group));
  }
  $('body').append($el);
  window.scrollTo(0, document.body.scrollHeight);
};
