// Everything OK?
console.log('OK');

/* Lettering JS Plugin
* Reference: https://github.com/davatron5000/Lettering.js/wiki
*/

// default
// $('h1').lettering();

// with Words options
// $('h1').lettering('words');

// with Lines options
// $('h1').lettering('lines');

/* Media Element Player Plugin
* Reference: https://github.com/mediaelement/mediaelement/blob/master/docs/usage.md
*/

// video
$("video").mediaelementplayer();
//  /video


// aside
AOS.init({
  duration: 1200
});
// /aside


// Headers
$("#synopsis h1").lettering("letters");
$("header h1").lettering("letters");
// /Headers


// cast info

$(function(){
  if($(window).width() >= 851) {

  $(".frodo").addClass("castcolor2");
  $(".ian").hide();
  $(".viggo").hide();
  $(".holm").hide();

  $(".frodo").click(function() {
    $(".viggo, .holm, .ian").hide();
    $(".eli").fadeIn("slow");
    $(".frodo").addClass("castcolor2");
    $(".aragorn, .bilbo, .gandalf").removeClass("castcolor2");
  });
  $(".gandalf").click(function() {
    $(".viggo, .holm, .eli").hide();
    $(".ian").fadeIn("slow");
    $(".gandalf").addClass("castcolor2");
    $(".bilbo, .frodo, .aragorn").removeClass("castcolor2");
  });
  $(".aragorn").click(function() {
    $(".ian, .holm, .eli").hide();
    $(".viggo").fadeIn("slow");
    $(".aragorn").addClass("castcolor2");
    $(".bilbo, .gandalf, .frodo").removeClass("castcolor2");
  });
  $(".bilbo").click(function() {
    $(".viggo, .ian, .eli").hide();
    $(".holm").fadeIn("slow");
    $(".bilbo").addClass("castcolor2");
    $(".aragorn, .frodo, .gandalf").removeClass("castcolor2");
  });
}
else {
  $(".eli").show();
  $(".ian").show();
  $(".viggo").show();
  $(".holm").show();
};
});

// /cast info


