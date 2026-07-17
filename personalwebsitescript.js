const recommendationsStorageKey = "personal_website_recommendations";

document.addEventListener("DOMContentLoaded", loadSavedRecommendations);

function addRecommendation() {
  // Get the message of the new recommendation
  let recommendationName = document.getElementById("new_recommendation_name");
  let recommendation = document.getElementById("new_recommendation");
  let nameText = recommendationName.value.trim();
  let recommendationText = recommendation.value.trim();

  // If the user has left a recommendation, save it and display it
  if (recommendationText != "") {
    console.log("New recommendation added");
    saveRecommendation({ name: nameText, text: recommendationText });
    showPopup(true);
    appendRecommendation({ name: nameText, text: recommendationText });

    // Reset the value of the textarea
    recommendationName.value = "";
    recommendation.value = "";
  }
}

function appendRecommendation(recommendationData) {
  // Create a new recommendation element and add the quote marks separately
  var element = document.createElement("div");
  element.setAttribute("class", "recommendation");

  var openingQuote = document.createElement("span");
  openingQuote.innerHTML = "&#8220;";

  var recommendationText = document.createTextNode(recommendationData.text || recommendationData);

  var closingQuote = document.createElement("span");
  closingQuote.innerHTML = "&#8221;";

  element.appendChild(openingQuote);
  element.appendChild(recommendationText);
  element.appendChild(closingQuote);

  if (recommendationData.name != null && recommendationData.name.trim() != "") {
    var recommendationName = document.createElement("div");
    recommendationName.setAttribute("class", "recommendation_name");
    recommendationName.textContent = "- " + recommendationData.name.trim();
    element.appendChild(recommendationName);
  }

  // Add this element to the end of the list of recommendations
  document.getElementById("all_recommendations").appendChild(element);
}

function loadSavedRecommendations() {
  let savedRecommendations = getSavedRecommendations();

  savedRecommendations.forEach(function (recommendation) {
    appendRecommendation(recommendation);
  });
}

function saveRecommendation(text) {
  let savedRecommendations = getSavedRecommendations();
  savedRecommendations.push(text);
  localStorage.setItem(recommendationsStorageKey, JSON.stringify(savedRecommendations));
}

function getSavedRecommendations() {
  let savedRecommendations = localStorage.getItem(recommendationsStorageKey);

  if (savedRecommendations == null) {
    return [];
  }

  try {
    let parsedRecommendations = JSON.parse(savedRecommendations);

    return parsedRecommendations.map(function (recommendation) {
      if (typeof recommendation === "string") {
        return { name: "", text: recommendation };
      }

      return recommendation;
    });
  } catch (error) {
    return [];
  }
}

function showPopup(bool) {
  if (bool) {
    document.getElementById('popup').style.visibility = 'visible'
  } else {
    document.getElementById('popup').style.visibility = 'hidden'
  }
}
