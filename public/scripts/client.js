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

const getStringDayDifference = function(tweetData) {
  // let diff = new moment.duration(Date.now() - tweetData.created_at);

  // return Math.floor(diff.asDays());

  return moment(tweetData.created_at).fromNow();
};

const createTweetElement = function(tweetData) {
  // .tweet
  let $tweet = $(`<article></article>`)
    .addClass(`tweet`);

  // .tweet-header
  let $tweetHeader = $(`<header></header>`)
    .addClass(`tweet-header`);
  $tweet.append($tweetHeader);

  // .tweet-header-left
  let $tweetHeaderLeft = $(`<div></div>`)
    .addClass(`tweet-header-left`);
  $tweetHeader.append($tweetHeaderLeft);

  // .tweet-avatar
  let $tweetAvatar = $(`<div></div>`)
    .addClass(`tweet-avatar`);
  $tweetAvatar.append($('<img>').attr('src', tweetData.user.avatars));
  $tweetHeaderLeft.append($tweetAvatar);

  // .tweet-poster-name
  let $tweetPosterName = $(`<div></div>`)
    .addClass(`tweet-poster-name`)
    .text(tweetData.user.name);
  $tweetHeaderLeft.append($tweetPosterName);

  // .tweet-header-right
  let $tweetHeaderRight = $(`<div></div>`)
    .addClass(`tweet-header-right`);
  $tweetHeader.append($tweetHeaderRight);

  // .tweet-poster-username
  let $tweetPosterUsername = $(`<div></div>`)
    .addClass(`tweet-poster-username`)
    .text(tweetData.user.handle);
  $tweetHeaderRight.append($tweetPosterUsername);

  // .tweet-body
  let $tweetBody = $(`<body></body>`)
    .addClass(`tweet-body`);
  $tweet.append($tweetBody);

  // .tweet-text
  let $tweetText = $(`<div></div>`)
    .addClass(`tweet-text`)
    .text(tweetData.content.text);
  $tweetBody.append($tweetText);

  // .tweet-footer
  let $tweetFooter = $(`<footer></footer>`)
    .addClass(`tweet-footer`);
  $tweet.append($tweetFooter);

  // .tweet-date
  let $tweetDate = $(`<div></div>`)
    .addClass(`tweet-date`)
    .text(`${getStringDayDifference(tweetData)}`);
  $tweetFooter.append($tweetDate);

  // .tweet-buttons
  let $tweetButtons = $(`<div></div>`)
    .addClass(`tweet-buttons`);
  $tweetButtons.append(`<i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>`);
  $tweetFooter.append($tweetButtons);
    
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

$(document).ready(() => {
  renderTweets(tweetDatabase);

});

