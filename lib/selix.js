(function() {
  var getCaret, getText, global, lineHandler, setCaret, setText, wrap;

  lineHandler = function(elem, position) {
    return position - (elem.value.slice(0, position).split('\r\n').length - 1);
  };

  getCaret = function(elem) {
    var elemRange, end, endRange, start;
    if (typeof elem.selectionStart === 'number' && typeof elem.selectionEnd === 'number') {
      return {
        start: elem.selectionStart,
        end: elem.selectionEnd
      };
    } else if (document.selection && document.selection.createRange && elem.createTextRange) {
      elemRange = elem.createTextRange();
      elemRange.moveToBookmark(document.selection.createRange().getBookmark());
      endRange = elem.createTextRange();
      endRange.collapse(false);
      if (elemRange.compareEndPoints('StartToEnd', endRange) >= 0) {
        start = end = elem.value.length;
      } else {
        start = -elemRange.moveStart('character', -elem.value.length);
        if (elemRange.compareEndPoints('EndToEnd', endRange) >= 0) {
          end = elem.value.length;
        } else {
          end = -elemRange.moveEnd('character', -elem.value.length);
        }
      }
      return {
        start: start,
        end: end
      };
    }
  };

  setCaret = function(elem, start, end) {
    var range;
    if (end == null) {
      end = start;
    }
    if (typeof elem.selectionStart === 'number' && typeof elem.selectionEnd === 'number') {
      elem.selectionStart = start;
      return elem.selectionEnd = end;
    } else if (document.selection && document.selection.createRange && elem.createTextRange) {
      range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', lineHandler(elem, end));
      range.moveStart('character', lineHandler(elem, start));
      return range.select();
    }
  };

  getText = function(elem) {
    var caret;
    caret = getCaret(elem);
    return elem.value.slice(caret.start, caret.end);
  };

  setText = function(elem, text) {
    var caret;
    caret = getCaret(elem);
    return elem.value = elem.value.slice(0, caret.start) + text + elem.value.slice(caret.end);
  };

  wrap = function(elem, before, after) {
    var caret, startPosition, text;
    caret = getCaret(elem);
    text = getText(elem);
    setText(elem, before + text + after);
    startPosition = caret.start + before.length;
    return setCaret(elem, startPosition, startPosition + text.length);
  };

  if (typeof exports !== 'undefined') {
    global = exports;
  } else {
    global = window;
  }

  global.selix = {
    getCaret: getCaret,
    setCaret: setCaret,
    getText: getText,
    setText: setText,
    wrap: wrap
  };

}).call(this);
