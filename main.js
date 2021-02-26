$(document).ready(() => {

  const fps = 60;
  let $intro_input = $("#intoTextInput");
  let $intro_testContainer = $("#intoTextTest");
  let $intro_output = $("#intoTextOutput");
  let theIntroDialog = null;


  // Init Intro Dialog
  if ( ($intro_input != null)&&($intro_testContainer != null)&&($intro_output != null) ){
    let intro_replics = $(document.getElementById("intoTextInput")).children().map(function(){return $(this).text();});
    theIntroDialog = new Dialog(Array.from(intro_replics), $intro_output, $intro_testContainer);
  }

  // Draw Intro Dialog
  if (theIntroDialog != null) {
    window.setInterval(function(){
      theIntroDialog.step();
      theIntroDialog.draw();
      theIntroDialog.instArray.forEach((_letter) => {
        _letter.step();
        _letter.draw();
      });
    }, 1000/fps);
  }


});
