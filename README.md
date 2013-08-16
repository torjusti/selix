selix - the JavaScript text input selection library
===================================================

selix helps you manipulate the selection inside of user inputs. It is very useful in cases such as text editors.

selix is a libary that

- aims to be extremely lightweight
- aims to be a simple to use
- aims to be compatible with many browsers - even old Internet Explorer versions

You can fetch a minified copy of selix from the lib folder.

Usage
-----

`selix.getCaret(elem)` will return an object containing `start` and `end` positions.
`selix.setCaret(elem, start, end)` will set the selection
`selix.getText(elem)` will return the currently highlighted text as a string.
`selix.setText(elem, text)` will set the highligted text
`selix.wrap(elem, before, after)` will wrap the selected text and select the contents

Warning
-------

In Internet Explorer the textarea must be focused for selix to work. However, when you click an element, Internet Explorer will always blur the textarea and focus the new element.

The following snippet shows how to deal with this and also serves as an example for basic usage of selix - how to add a HTML tag.

```
<textarea id="post-stuff-here"></textarea>
<span id="header-button" unselectable="on"></span>
<script type="text/javascript">
// jQuery is implied
$(function() {
  var elem = document.getElementById('post-stuff-here');
  $('#header-button').click(function() {
    selix.wrap(elem, '<h1>', '</h1>');
  });
});
</script>
```

Get involved
------------

selix is still very young and therefore bug reports are very much encouraged. Feel free to submit pull requests. selix is built using grunt from the command line.

License
-------

selix is licensed under the MIT license which is found in the root of this repository.