// Disable ESLint
/* eslint-disable no-undef */
$(document).ready(() => {
  console.log("loaded");
  $("article.tweet").hover(
    function() {
      $("i.fa").css("opacity", "1");
    },
    function() {
      $("i.fa").css("opacity", "0");
    }
  );
});