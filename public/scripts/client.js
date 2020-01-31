/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-disable no-undef */

const tweetDatabase = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
  const container = $('#tweets-container');
  for (const tweet of tweets) {
    container.append(createTweetElement(tweet));
  }
};

const loadTweets = function(callback) {
  $.get('/tweets').then(callback);
};

$(document).ready(() => {
  loadTweets(renderTweets);

  // Useable button
  const $form = $(`section.new-tweet form`);
  $form.submit(function(event) {
    event.preventDefault();

    const tweet = $form.serializeArray()[0].value;
    if (tweet.length <= 0) {
      alert(`Tweet is empty!`);
    } else if (tweet.length > 140) {
      alert("Tweet is too long!");
    } else {
      $.post('/tweets', $form.serialize());
    }
  });
});

