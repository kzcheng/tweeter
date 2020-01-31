/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-disable no-undef */

const getStringDateDifference = function(tweetData) {
  return moment(tweetData.created_at).fromNow();
};

const createTweetElement = function(tweetData) {
  // .tweet
  let $tweet = $(`<article>`)
    .addClass(`tweet`);

  // .tweet-header
  let $tweetHeader = $(`<header>`)
    .addClass(`tweet-header`);
  $tweet.append($tweetHeader);

  // .tweet-header-left
  let $tweetHeaderLeft = $(`<div>`)
    .addClass(`tweet-header-left`);
  $tweetHeader.append($tweetHeaderLeft);

  // .tweet-avatar
  let $tweetAvatar = $(`<div>`)
    .addClass(`tweet-avatar`);
  $tweetAvatar.append($('<img>').attr('src', tweetData.user.avatars));
  $tweetHeaderLeft.append($tweetAvatar);

  // .tweet-poster-name
  let $tweetPosterName = $(`<div>`)
    .addClass(`tweet-poster-name`)
    .text(tweetData.user.name);
  $tweetHeaderLeft.append($tweetPosterName);

  // .tweet-header-right
  let $tweetHeaderRight = $(`<div>`)
    .addClass(`tweet-header-right`);
  $tweetHeader.append($tweetHeaderRight);

  // .tweet-poster-username
  let $tweetPosterUsername = $(`<div>`)
    .addClass(`tweet-poster-username`)
    .text(tweetData.user.handle);
  $tweetHeaderRight.append($tweetPosterUsername);

  // .tweet-body
  let $tweetBody = $(`<div>`)
    .addClass(`tweet-body`);
  $tweet.append($tweetBody);

  // .tweet-text
  let $tweetText = $(`<div>`)
    .addClass(`tweet-text`)
    .text(tweetData.content.text);
  $tweetBody.append($tweetText);

  // .tweet-footer
  let $tweetFooter = $(`<footer>`)
    .addClass(`tweet-footer`);
  $tweet.append($tweetFooter);

  // .tweet-date
  let $tweetDate = $(`<div>`)
    .addClass(`tweet-date`)
    .text(`${getStringDateDifference(tweetData)}`);
  $tweetFooter.append($tweetDate);

  // .tweet-buttons
  let $tweetButtons = $(`<div>`)
    .addClass(`tweet-buttons`);
  $tweetButtons.append(`
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    `);
  $tweetFooter.append($tweetButtons);
    
  return $tweet;
};

const renderTweets = function(tweets) {
  const $container = $('#tweets-container');
  $container.empty();
  for (let i = tweets.length - 1; i >= 0; i--) {
    $container.append(createTweetElement(tweets[i]));
  }
};

const loadTweets = function(callback) {
  $.get('/tweets').then(callback);
};

$(document).ready(() => {
  loadTweets(renderTweets);
  $(`div.error-message`).hide();

  // Useable button
  const $form = $(`section.new-tweet form`);
  $form.submit(function(event) {
    event.preventDefault();

    const tweet = $form.serializeArray()[0].value;
    if (tweet.length <= 0) {
      $("div.error-message").text(`Tweet is empty!`).slideDown();
    } else if (tweet.length > 140) {
      $("div.error-message").text(`Tweet is too long!`).slideDown();
    } else {
      $("div.error-message").slideUp();
      $.post('/tweets', $form.serialize()).done(()=>{
        loadTweets(renderTweets);
      });
      $(`textarea.new-tweet-input`).val('');
    }
  });

  // Toggle New Tweet
  const $button = $(`#toggle-new-tweet`);
  $button.click(function() {
    $(`.new-tweet`).slideToggle();
  });
});

