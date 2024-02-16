"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="star">
          <i class="bi bi-star"></i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function toggleFavorite(evt) {
  // console.log("clicked");
  const $selectStar = $(evt.target);
  $selectStar.toggleClass("bi-star-fill");
  $selectStar.toggleClass("bi-star");
  const $storyID = $selectStar
    .closest("li")
    .attr("id");
  for (let story of storyList){
    let storyListIndex;
    if (story.storyId === $storyID){
      storyListIndex = storyList.indexOf(story);
      break;
    }
  }
  currentUser.addFavorite(storyList[storyListIndex]);

}

$("ol").on("click", "i", toggleFavorite);

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Collects data to create a new story, appends it to the page, hides and resets submit form */

async function addStoryToStoryList(evt) {
  evt.preventDefault();

  const $author = $("#author-input");
  const $title = $("#title-input");
  const $url = $("#url-input");

  const author = $author.val();
  const title = $title.val();
  const url = $url.val();

  const addedStoryInstance = await storyList.addStory(currentUser, { author, title, url });

  const $addedStory = generateStoryMarkup(addedStoryInstance);
  $allStoriesList.prepend($addedStory);

  $submitForm.hide();

  $author.val("");
  $title.val("");
  $url.val("");
}

$("#submit-form").on("submit", addStoryToStoryList);