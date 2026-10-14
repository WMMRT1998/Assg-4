const tvUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";

let id = (id) => document.getElementById(id);
let results = document.getElementById("results");

let submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", async function (event) {
    event.preventDefault();
    let params = new FormData(id("input-form"));

    const response = await fetch(tvUrl + encodeURIComponent(params.get("Show")));

    const shows = await response.json();

    console.log(shows);

    for (let show of shows) {
       
        createShowCard(show.show);
    }
   
   
   
   //Original code below, commented out for reference. I switched to async/await because it seemed easier to write and read. 
   //Async felt more like previous code I had written in the past, and seemed more intuitive to me.
   
    /*fetch(tvUrl + encodeURIComponent(params.get("Show")))
      .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })

        
        .then(shows => {
            console.log(shows)
            console.log(shows[0].show.name)
        
        
        })
       
        
       
        .catch(error => console.error('Error:', error));

        */
});



function createShowCard(show) {
    card = document.createElement("div");
    card.classList.add("show-card");

    let ShowName = document.createElement("h4");
    let showDetails = document.createElement("ul");
    let showSummary = document.createElement("li");
    let showGenres = document.createElement("li");

    

    ShowName.textContent = show.name;
    showSummary.textContent = show.summary;

    showSummary.textContent = showSummary.textContent.replace(/<[^>]*>?/gm, '');

    showGenres.textContent = "Genres: " + show.genres.join(", ");

    card.appendChild(ShowName);
    showDetails.appendChild(showSummary);
    showDetails.appendChild(showGenres);
    card.appendChild(showDetails);
    console.log(show.name);

    results.appendChild(card);
}
