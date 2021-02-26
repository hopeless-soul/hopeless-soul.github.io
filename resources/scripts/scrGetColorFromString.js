function scrGetColorFromString(str) {
  switch (str) {
    case "red":   return new RGB(255,0,0);
    case "green": return new RGB(0,255,0);
    case "blue":  return new RGB(0,0,255);
    case "white": return new RGB(255,255,255);
    case "black": return new RGB(0,0,0);
    case "pink":  return new RGB(255,109,198);
    case "9999":  return "9999";
    default: console.log("Default color");; return new RGB(255,255,255);
  }
}
