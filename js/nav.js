"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

function navFavoritesList(evt) {
  console.debug("navFavoritesList", evt);
  hidePageComponents();

  $allStoriesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();

}

$("#nav-favorite-story").on("click", navFavoritesList);


/** Show the hidden submit form to the user */
function navNewStoryForm(evt) {
  console.debug("navNewStoryForm", evt);
  $submitForm.show();
}

$("#nav-submit-story").on("click", navNewStoryForm);

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


