function scrCalculateRect(_text, _wrapWidth, _$intro_testContainer) {
    // calculate the size of drawn dialogue
    let _curWidth = 0, _size = [0,0];
    var _shakeState = false;
    let _linesWidth = [];
    let _parameter = [];
    for (var i = 0; i < _text.length; i++) {

      let _letter = _text[i];
      _tmp = new Character(0, 0, _$intro_testContainer, _$intro_testContainer); // from main.js
      _tmp.letter = _letter;
      _tmp2 = _tmp.getLetterSize();
      _tmp = null;

      if (_letter == "\\")
      {
        i++;
        let _nextLetter = _text[i];
        switch (_nextLetter) {
          case "n":
            _size[1] += _tmp2[1];
            _linesWidth.push(_curWidth)
            _curWidth = 0;
            i += 0;
            break;
          case "f":
            i += 0;
            break;
          case "s":
            if (_text[i + 1] != "[") {
              i += 0;
            } else {
              _paramter = scrGetParameters(_text, i + 1);
              i += 0 + _paramter[0];
            }
            break;
          case "g":
            if (_text[i + 1] != "[") {
              i += 0;
            } else {
              _paramter = scrGetParameters(_text, i + 1);
              i += 0 + _paramter[0];
            }
            break;
          case "l":
            if (_text[i + 1] != "[") {
              i += 0;
            } else {
              _paramter = scrGetParameters(_text, i + 1);
              i += 0 + _paramter[0];
            }
            break;
          case "c":
            _paramter = scrGetParameters(_text, i + 1);
            i += 0 + _paramter[0];
            break;
          case "t": // wait for more time
            _paramter = scrGetParameters(_text, i + 1);
            i += 0 + _paramter[0];
            break;
          case "a":
            _paramter = scrGetParameters(_text, i + 1);
            i += 0 + _paramter[0];
            break;
        }
      }
      else
      {
        let _width = _tmp2[0];
        if (_curWidth + _width >= _wrapWidth)
        {
            _linesWidth.push(_curWidth);
            _curWidth = 0;
            _size[1] += _tmp2[1];
        }
        else
        {
            _curWidth += _width;
        }
        if (_size[1] == 0) {_size[1] += _tmp2[1]}
        _size[0] = Math.min(Math.max(_curWidth, Math.max(..._linesWidth)), _wrapWidth);
      }
    }
    return _size;
}

function lendir_x(dist, angle) {
  return dist * Math.cos( angle );
}
function lendir_y(dist, angle) {
  return dist * Math.sin( angle );
}
