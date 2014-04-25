### @license selix - github.com/bilde - MIT License ###

lineHandler = (elem, position) ->
  elem.value.slice(0, position).split('\r\n').length - 1

getCaret = (elem) ->
  elem.focus();
  if typeof elem.selectionStart is 'number' and typeof elem.selectionEnd is 'number'
    start: elem.selectionStart,
    end: elem.selectionEnd
  else if document.selection and document.selection.createRange and elem.createTextRange
    # Create a TextRange object in the element
    elemRange = elem.createTextRange()
    elemRange.moveToBookmark document.selection.createRange().getBookmark()
    # Create another TextRange in the element and move it to the end of the data
    endRange = elem.createTextRange()
    # For some reason this does not default to false so we need to pass it to it
    endRange.collapse(false)
    # Check if the caret is at the end of the text because then moveStart and
    # moveEnd does not work
    if elemRange.compareEndPoints('StartToEnd', endRange) >= 0
      start = end = elem.value.length
    else
      # moveStart and moveEnd returns how many characters it moved
      start = - elemRange.moveStart('character', - elem.value.length)
      start += lineHandler(elem, start)
      # Check if the caret ends at the end of the text
      if elemRange.compareEndPoints('EndToEnd', endRange) >= 0
        end = elem.value.length
      else
        # Finally we calculate the end position
        end = - elemRange.moveEnd('character', - elem.value.length)
        end += lineHandler(elem, end)
    # Return the selection as an object
    start: start,
    end: end

setCaret = (elem, start, end = start) ->
  elem.focus();
  if typeof elem.selectionStart is 'number' and typeof elem.selectionEnd is 'number'
    elem.selectionStart = start
    elem.selectionEnd = end
  else if document.selection and document.selection.createRange and elem.createTextRange
    # Create a new range in the element
    range = elem.createTextRange()
    # Move the range to the start of the element
    range.collapse true
    # Move the positions to the place specified in characters
    range.moveEnd 'character', end - lineHandler(elem, end)
    range.moveStart 'character', start - lineHandler(elem, start)
    # Select the range so that it is visible
    range.select()

# Returns the selected text by locating the text between the caret start and end
getText = (elem) ->
  caret = getCaret elem
  elem.value.slice(caret.start, caret.end)

# Sets the selected text
setText = (elem, text, select) ->
  caret = getCaret elem
  elem.value = elem.value.slice(0, caret.start) + text + elem.value.slice(caret.end)
  if select then setCaret(elem, caret.start, caret.start + text.length)

# Wraps the selected text
wrap = (elem, before, after) ->
  caret = getCaret elem
  text = getText elem
  setText elem, before + text + after
  startPosition = caret.start + before.length
  setCaret elem, startPosition, startPosition + text.length

selix =
  getCaret: getCaret
  setCaret: setCaret
  getText: getText
  setText: setText
  wrap: wrap

# Export to Node or window
if typeof exports isnt 'undefined'
  module.exports = selix
else if typeof window isnt 'undefined'
  window.selix = selix