class Dialog {
  textSequence = [];
  instArray = [];
  testingContainer = null;
  outputContainer = null;

  rectCreated = false;
  $node =       null;
  speaker =     null;
  newSpeaker =  null;
  element =     null;
  $element =     null;

  // roundrect
  isInRect =      false;
  rectSize =      [0, 0];
  targRectSize =  [0, 0];
  rectPos =       [0, 0];
  targRectPos =   [0, 0];
  dialogShakeMagnitude = 5;
  // margin: 0 -> top | 1 -> down | 2 -> left | 3 -> right
  rectMargin =    [10, 10, 10, 10];
  linearTime =    5;
  triSideLength = 5;
  triOffsetY =    8;
  // set the position of each side of triangle
  // b(1)-----a(0)
  //     c(2)
  triSideX = [0, 0, 0];
  triSideY = [0, 0, 0];
  // set maximum width of dialogue.
  maximumWidth =  500;

  // animation
  animTotalSteps = 30;
  animStepCounter = 0;
  animOpen =      false;
  animClose =     false;

  // text
  textPosX = 0;
  textPosY = 0;

  curText = "";
  curTextLength = -1;
  curTextWidth = 0;
  curTextCounter = 1;
  curTextColor = new RGB(255, 255, 255);
  curTextGradientColor = null;
  curTextGradient = false;
  curTextGradientAngle = 0;

  nextCharTimer = 0;
  nextCharTimerAdditional = 0;
  nextCharInterval = 2;

  shaking = false;
  shakingType = -1;
  shakingDuration = -1;
  shakingTimer = 0;
  shakingVibration = 4;

  glowing = false;
  glowPulsing = false;
  curGlowColor = null;
  curGlowStrength = -1;

  // recorf shake screend view;
  shakingOriViewX = -1;
  shakingOriViewY = -1;
  shakingOffsetX =  0;
  shakingOffsetY = 0;

  floating = false;
  floatVibration = 10;

  constructor( textSequence, outputContainer, testingContainer ) {
    this.outputContainer = outputContainer;
    this.testingContainer = testingContainer;
    this.textSequence = textSequence;
    this.startDialog();
    this.resetDialogPosition();
    this.textPosX = 0;
    this.textPosY = 0;
  }

  destroyDialog() {}
  initDestroing() { new Character().fade = true; this.animClose = true;}
  startDialog() {
    // Start Dialogue
    this.curText = this.textSequence.shift();
    this.curTextLength = this.curText.length;
    this.curTextCounter = 0;
    this.nextCharTimer = 0;
    this.speaker = this.outputContainer;
    this.maximumWidth = this.speaker.width();
    // re-calculate rect size
    if (this.speaker != null) {
      this.targRectSize = scrCalculateRect(this.curText, this.maximumWidth, this.testingContainer);
      this.targRectSize[1] += this.rectMargin[0] + this.rectMargin[1];
      this.targRectSize[0] += this.rectMargin[2] + this.rectMargin[3];
    }
    // reset parameters
    this.textPosX = 0;
    this.textPosY = 0;
    this.curTextColor = new RGB(0,0,0);
    this.shaking = false; this.shakingType = -1; this.shakingDuration = -1;
    this.floating = false;
    this.glowing = false;
    // Start open animation
    this.animOpen = true;
  }
  resetDialogPosition() {
    if (this.element != null ) {

    } else if (this.speaker != null) {
      //TODO: create new speaker class
      // $("#myElement")[0].getBoundingClientRect();
      let _centerX = this.speaker.get(0).getBoundingClientRect()["left"] + ((this.speaker.get(0).getBoundingClientRect()["right"] - this.speaker.get(0).getBoundingClientRect()["left"])/2);
      let _centerY = this.speaker.get(0).getBoundingClientRect()["top"];
      //TODO: creatr lendir foo
      this.triSideX[0] = _centerX + lendir_x(this.triSideLength, 60);
      this.triSideY[0] = _centerY - this.triOffsetY - lendir_y(this.triSideLength, 60);
      this.triSideX[1] = _centerX + lendir_x(this.triSideLength, 120);
      this.triSideY[1] = _centerY - this.triOffsetY - lendir_y(this.triSideLength, 120);;
      this.triSideX[2] = _centerX;
      this.triSideY[2] = _centerY - this.triOffsetY + 10;

    } else { return; }
  }
  draw() {
    if (this.rectCreated) {
      this.$node.css({
        "position":"fixed",
        "left":`${this.rectPos[0]}px`,
        "top":`${this.rectPos[1]}px`,
        "width":`${this.rectSize[0]}px`,
        "height":`${this.rectSize[1]}px`,
        "background":"black"
      });
    } else {
      let _node = document.createElement('span');
      this.$node = $(_node);
      console.log("rect size: ", this.rectSize);

      this.$node.css({
        "position":"fixed",
        "left":`${this.rectPos[0]}px`,
        "top":`${this.rectPos[1]}px`,
        "width":`${this.rectSize[0]}px`,
        "height":`${this.rectSize[1]}px`,
        "background":"black"
      });
      this.$element = this.outputContainer;
      this.$element.append(this.$node);
      this.rectCreated = true;
    }
  }
  step() {
      let _paramter;
      // Animation Open wihout steps.
      // if (this.animOpen && this.animTotalSteps) {this.animOpen = false; this.animClose = false;}
      // Animation Open && Closing execution
      if (this.animOpen || this.animClose) {
        // Width is static

        this.rectSize[0] = this.targRectSize[0];
        this.rectSize[1] = this.targRectSize[1];
        // Animation Open
        if (this.animOpen) { this.rectSize[1] = Math.floor( EasyOutSine(this.animStepCounter / this.animTotalSteps, 0, this.targRectSize[1], 1) );}
        // Animation Close
        if (this.animClose) { this.rectSize[1] = EasyOutSine(this.animStepCounter / this.animTotalSteps, this.targRectSize[1], 0, 1); }
        this.animStepCounter += 1;

        // Change Speaker || close dialog
        if ( this.animStepCounter >= this.animTotalSteps ) {
          this.animStepCounter = 0;
          // Close
          if (this.animClose) {
            if ( this.textSequence.isEmpty() ) {
              destroyDialog();
              return;
            } else {
                if ( this.newSpeaker != null ) {
                  this.speaker = this.newSpeaker;
                  this.newSpeaker = null;
                  resetDialogPosition();
                }
                this.animClose = false;
                startDialog();
                return;
            }
          }
          // Still Condition || Or stop Open Animation
          this.animOpen = false;
          this.animClose = false;

        }
      }
      // Printing && Closing Trigger
      else if ( this.curTextLength != -1 ) {
        // Printing
        if (this.curTextCounter < this.curTextLength ){
          if ( this.nextCharTimer == 0 && this.nextCharTimerAdditional == 0 ) {
            let _char = this.curText[this.curTextCounter];
            // this.curTextCounter += 1;
            if (_char == "\\") {
              let _nextChar = this.curText[this.curTextCounter + 1];
              switch (_nextChar) {
                case "n": // new line
                  let tmp = new Character(0,0,this.testingContainer,this.testingContainer);
                  tmp.letter = "H";
                  let tmpH = tmp.getLetterSize()[1];
                  this.textPosY += (tmpH * 80) / 100;
                  this.textPosX -= this.curTextWidth;
                  this.curTextWidth = 0;
                  this.curTextCounter += 2;
                  // this.targRectSize[0] += this.rectMargin[2] + this.rectMargin[3];
                  break;
                case "s": // shake (need 2 parameter)
                  if (this.shaking)
                  {
                    // stop shaking (below if statment)
                    this.curTextCounter += 2;
                  }
                  else
                  {
                    // start shaking
                    _paramter = scrGetParameters(this.curText, this.curTextCounter + 2);
                    this.shakingType = _paramter[1];
                    console.log("shaking type: ", this.shakingType);
                    this.shakingDuration = _paramter[2];
                    this.curTextCounter += 2 + _paramter[0];
                    if (this.shakingType == 0) { this.shakingTimer = this.shakingDuration; }
                  }
                  this.shaking = !this.shaking;
                  break;
                case "f": // following characters will be floating
                  this.floating = !this.floating;
                  this.curTextCounter += 2;
                  break;
                case "c": // color
                  _paramter = scrGetParameters(this.curText, this.curTextCounter + 2);
                  this.curTextColor = scrGetColorFromString(_paramter[1]);
                  this.curTextCounter += 2 + _paramter[0];
                  break;
                case "t": // wait for more time
                  _paramter = scrGetParameters(this.curText, this.curTextCounter + 2);
                  this.nextCharTimerAdditional = Math.round(_paramter[1]);
                  this.curTextCounter += 2 + _paramter[0];
                  break;
                case "p": // change the speaker
                  break;
                case "g": // gradient
                  if ( this.curTextGradient )
                  {
                    this.curTextCounter += 2;
                  }
                  else
                  {
                    _paramter = scrGetParameters(this.curText, this.curTextCounter + 2);
                    this.curTextColor = scrGetColorFromString(_paramter[1]);
                    this.curTextGradientColor = scrGetColorFromString(_paramter[2]);
                    this.curTextGradientAngle = _paramter[3];
                    this.curTextCounter += 2 + _paramter[0];
                  }
                  this.curTextGradient = !this.curTextGradient;
                  break;
                case "l": // following characters will be glowing

                  if (this.glowing) {
                    this.curTextCounter += 2;
                  } else {
                    _paramter = scrGetParameters(this.curText, this.curTextCounter + 2);
                    this.curGlowStrength = _paramter[1];
                    if (_paramter.length >= 3) { this.curGlowColor = _paramter[2] }
                    this.curTextCounter += 2 + _paramter[0];
                  }
                  this.glowing = !this.glowing;
                  break;
                case "a":
                  _paramter = scrGetParameters(this.curText, this.curTextCounter + 2);
                  this.nextCharInterval = _paramter[1];
                  this.curTextCounter += 2 + _paramter[0];
                  break;
                default:
                  //TODO: add exception
                  console.log(_nextChar);
                  console.log("Unknow command");
                  break;
              }
            } else {
              let _inst = new Character(this.targRectPos[0] + this.rectMargin[2] + this.textPosX,
                                        this.targRectPos[1] + this.rectMargin[0] + this.textPosY,
                                        this.outputContainer,
                                        this.testingContainer);

              // Init Letter
              _inst.letter = _char;
              // Смещение каретки
              let _curLetterWidth = _inst.getLetterSize()[0];
              this.textPosX += _curLetterWidth;
              this.curTextWidth += _curLetterWidth;

              // Color
              if (this.curTextColor == 9999){
                _inst.rainbowColor = true;
              }
              else {
                if ( this.curTextGradient ) { _inst.gradientAngle = this.curTextGradientAngle; _inst.gradientColor = this.curTextGradientColor; _inst.color = this.curTextColor; }
                else { _inst.color = this.curTextColor; }
              }

              // Shaking
              if ( this.shaking && (this.shakingType == 1)) {
                _inst.shake = true;
              }
              // Define Character(Letter) Properties
              _inst.glow = this.glowing;
              _inst.glowClor = this.curGlowColor;
              _inst.glowStrength = this.curGlowStrength;
              _inst.shakeDuration = this.shakingDuration;
              _inst.float = this.floating;

              this.instArray.push(_inst);

              this.curTextCounter += 1;
            }
            // Refreash Interval
            this.nextCharTimer = this.nextCharInterval;
          }
          else {
            if (this.nextCharTimer > 0) {
              this.nextCharTimer -= 1;
            }
            else if ( this.nextCharTimerAdditional > 0 ) {
              this.nextCharTimerAdditional -= 1;
            }
          }
        }
        // Close Trigger
        else if (false) {}
      }

      //
      /// Roundrect position refreshing
        if ( this.speaker != null ){
          this.targRectPos[0] = this.speaker.get(0).getBoundingClientRect()["left"]  - this.targRectSize[0]/2 + this.speaker.get(0).getBoundingClientRect()["width"]/2;
          this.targRectPos[1] = this.speaker.get(0).getBoundingClientRect()["top"] ;
          this.rectPos[0] = this.targRectPos[0];
          this.rectPos[1] = this.targRectPos[1];
        }

      /// Dialog Shake
      if (this.shakingTimer > 0) {
        if (this.shakingType == 0) {
          this.shakingTimer -= 1;
          let _randX = getRandomIntInclusive(-Math.abs(this.dialogShakeMagnitude), Math.abs(this.dialogShakeMagnitude));
          let _randY = getRandomIntInclusive(-Math.abs(this.dialogShakeMagnitude), Math.abs(this.dialogShakeMagnitude));
          this.rectPos[0] = this.targRectPos[0] + _randX;
          this.rectPos[1] = this.targRectPos[1] + _randY;
          this.instArray.forEach((_letter) => {
            _letter.Pos[0] = _letter.startPos[0] + _randX;
            _letter.Pos[1] = _letter.startPos[1] + _randY;
          });
        }
      } else {
        if (this.shakingTimer == 0) {
          if (this.shakingType == 0) {
            this.rectPos[0] = this.targRectPos[0];
            this.rectPos[1] = this.targRectPos[1];
            this.instArray.forEach((_letter) => {
              _letter.Pos[0] = _letter.startPos[0];
              _letter.Pos[1] = _letter.startPos[1];
            });
          }
        }
      }
  }
}
