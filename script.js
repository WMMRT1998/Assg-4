const tvUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";

let id = (id) => document.getElementById(id);

let params = new FormData(id("input-form"));
let submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  fetch(tvUrl + params.get("Show"))
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
});