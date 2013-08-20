var elem = document.getElementById('editor-message');
$('#editor-controls span').click(function() {
  elem.focus();
  var tag = this.getAttribute('data-tag').split(',');
  selix.wrap(elem, tag[0], tag[1]);
});