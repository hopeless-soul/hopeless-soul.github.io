class RGB {
  r = 0;  g = 0;  b = 0;
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  toHEX(){
    return "#" + ((1 << 24)+(this.r << 16)+(this.g << 8)+this.b).toString(16).slice(1);
  }
}

class HSV {
  h = 0; s = 0; v = 0;
  constructor(h, s, v) {
    this.h = h;
    this.s = s;
    this.v = v;
  }
  toRGB() {
    var r, g, b;
    var i;
    var f, p, q, t;

    let h = this.h;
    let s = this.s;
    let v = this.v;
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
  }
  toHEX() {
    let tmpRGB = this.toRGB();
    let oTmpRGB = new RGB(tmpRGB[0], tmpRGB[1], tmpRGB[2]);
    return oTmpRGB.toHEX();
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Включаючи мінімум та максимум
}
