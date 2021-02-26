function scrGetParameters(text, startIndex) {
  // example:
  // \c[1,2,3]
  //   ^ <- this is start index
  // result[0] -> the total length of parameter string. (from '[' to ']')
  // result[1..] -> the value of each parameter.
  let _parameters = [], _analyzedText;
  let _endIndex = startIndex;
  let _textLength = text.length - startIndex;
  _endIndex += text.substr(startIndex+1).indexOf(']') + 1;
  _textLength = _endIndex+1 - (startIndex + 1);
  _analyzedText = text.substr(startIndex+1, _textLength);
  _textLength = _analyzedText.length;
  let _storedText = "";
  _parameters.push( (_endIndex - startIndex) + 1 );

  for (var i = 0; i < _textLength; i++) {
    let _char = _analyzedText[i];
    if (_char == "[" || _char == "]") {
      if (_storedText != "") {_parameters.push(_storedText);}
      break;
    }
    if (_char == "," && _storedText == "") {
      throw 'Parsing Error!#Missing necessary argument!';
    }
    else if (_char == ",") {
      _parameters.push(_storedText);
      _storedText = "";
    }
    else {
      _storedText += _char;
    }
    if (i == _textLength) {
      _parameters.push(_storedText);
    }
  }

  return _parameters;
}
