function EasyOutSine(time, start, end, duration) {
  return (end-start) * Math.sin(time/duration * (Math.PI/2) + start);
}
