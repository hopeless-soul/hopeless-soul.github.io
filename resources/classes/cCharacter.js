class Character {
  letter = "";
  testingContainer = null;
  outputContainer = null;
  color = null;
  colorHEX = "";
  opacity = 0.0;
  created = false;
  rainbowColor = false;
  rainbowHue = 0;
  gradientColor = -1;
  gradientColorHEX = "";
  gradientAngle = 0;
  fontName = "";
  shake = false;
  shakeMagnitude = 1;
  shakeDuration = -1;
  float = false;
  floatingVibration = 5;
  floatingCounter = 0;
  glow = false;
  glowColor = null;
  glowStrength = -1;

  $element = null;
  $node = null;

  Pos = [0, 0];
  startPos = [0, 0];

  static fade = false;

  constructor( x, y, outputContainer, testingContainer ) {
    this.Pos[0] = x;
    this.Pos[1] = y;
    this.startPos[0] = x;
    this.startPos[1] = y;
    this.testingContainer = testingContainer;
    this.outputContainer = outputContainer;
  }

  destroy() {}
  draw() {
    if (this.created) {

      if (this.letter != ""){


        // Standart
        this.$node.css({
          "position":"fixed",
          "left":`${this.Pos[0]}px`,
          "top":`${this.Pos[1]}px`,
          "opacity": `${this.opacity}`
        });

        // Color
        if (this.gradientColor == -1) {
          this.$node.css({
            "text-fill-color": `${this.colorHEX}`
          });
        } else {
          this.$node.css({
            "background": `-webkit-linear-gradient(${this.gradientColorHEX}, ${this.colorHEX})`,
            "-webkit-background-clip": "text",
            "text-fill-color": "transparent"
          });
        }

        // Glow
        if (this.glow) {
          this.$node.css({
            "text-shadow": `0 0 ${this.glowStrength}px ${this.colorHEX}`
          });
        }
      }

    }
    // Init Letter
    else {
        let _node = document.createElement('span');
        _node.innerText = this.letter;
        this.$node = $(_node);

        // Standart Init
        this.$node.css({
          "position":"fixed",
          "left":`${this.Pos[0]}px`,
          "top":`${this.Pos[1]}px`,
          "opacity": `${this.opacity}`,
          "user-select": "none"
        });

        // Set Color
        if (this.gradientColor == -1) {
          this.$node.css({
            "text-fill-color": `${this.colorHEX}`
          });
        } else {
          this.$node.css({
            "background": `-webkit-linear-gradient(${this.gradientColorHEX}, ${this.colorHEX})`,
            "background-clip": "text",
            "text-fill-color": "transparent"
          });
        }


        // this.$element = $("#app");
        this.$element = this.outputContainer;
        this.$element.append(this.$node);
        this.created = true;
    }
  }
  getLetterSize() {
    //
    let _nodeWidth = 0, _nodeHeight = 0;
    // let _element = document.getElementById(testingContainer);
    let _element = this.testingContainer;
    let _node = document.createElement('span');
    if (this.letter == " ") {
      _node.innerText = "_";
    } else {
      _node.innerText = this.letter;
    }
    _element.append(_node);
    _nodeWidth = _node.getBoundingClientRect().width;
    _nodeHeight = _node.getBoundingClientRect().height;
    _element.empty();
    // console.log(_element.remove(_node));;
    return [_nodeWidth, _nodeHeight];
  }


  step() {
    if (!this.fade) {
      // Fade in
      if (this.opacity <= 1.0) { this.opacity += 0.1 }
      // Shake
      if ( this.shake && (this.shakeDuration > 0 || this.shakeDuration == -1) ) {
        if (this.shakeDuration > 0) {
          this.shakeDuration -= 1;
          this.Pos[0] = this.startPos[0] + getRandomIntInclusive(-Math.abs(this.shakeMagnitude), Math.abs(this.shakeMagnitude));
          this.Pos[1] = this.startPos[1] + getRandomIntInclusive(-Math.abs(this.shakeMagnitude), Math.abs(this.shakeMagnitude));
        } else {
          this.Pos[0] = this.startPos[0] + getRandomIntInclusive(-Math.abs(this.shakeMagnitude), Math.abs(this.shakeMagnitude));
          this.Pos[1] = this.startPos[1] + getRandomIntInclusive(-Math.abs(this.shakeMagnitude), Math.abs(this.shakeMagnitude));
        }
      }
      // Float
      if (this.float) {
        this.Pos[1] = this.startPos[1] + this.floatingVibration * Math.sin( (this.floatingCounter * Math.PI)/180 );
        this.floatingCounter = (this.floatingCounter + 4) % 360;
      }
      // RainbowColor
      if (this.rainbowColor) {
        this.rainbowHue = (this.rainbowHue + 1) % 360
        this.colorHEX = new HSV(this.rainbowHue, 100, 100).toHEX();
      }else{
        // RGB to HEX
        if (this.color != null){
          this.colorHEX = this.color.toHEX();
        }
        if (this.gradientColor != -1) {
          this.gradientColorHEX = this.gradientColor.toHEX();
        }
      }
    }
    // Fade Out && Destroy
    else {
      if (this.opacity > 0) { this.opacity -= 0.1 }
      else{ destroy(); }
    }

  }
}
