const tvUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";

let id = (id) => document.getElementById(id);
let results = document.getElementById("results");

let submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", async function (event) {
    event.preventDefault();
    clearResults();
    
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

async function getCast(showId) {
    const response = await fetch(castUrl.replace("SHOW_ID", showId));
    const cast = await response.json();
    /*
            Test to make sure this function does get class list for each show.
    
        for (let member of cast) {
            console.log(member.person.name);
            }
            
    */
    return cast;
}

async function createShowCard(show) {

    let castList = document.createElement("ul");
    let cast = await getCast(show.id);

    //Only show first 5 cast members, or all cast if there are less than 5.
    for (let i = 0; i < 5 && i < cast.length; i++) {
        castList.appendChild(document.createElement("li")).textContent = cast[i].person.name;
    }

    card = document.createElement("div");
    card.classList.add("show-card");

    let ShowName = document.createElement("h4");
    let showDetails = document.createElement("ul");
    let showSummary = document.createElement("li");
    let showGenres = document.createElement("li");
    let showPremiere = document.createElement("li");
    let showRating = document.createElement("li");
    let showEnded = document.createElement("li");
    let showURL = document.createElement("a");
    showURL.textContent = "More Info on TVMaze"
    showURL.href = show.url;


//doesn't work yet, but I want to remove the list item if it is empty.
    clearNoResults(showSummary);
    clearNoResults(showGenres);
    clearNoResults(showPremiere);
    clearNoResults(showRating);
    clearNoResults(showEnded);

    ShowName.textContent = show.name;
    showSummary.textContent = show.summary;

    showSummary.textContent = showSummary.textContent.replace(/<[^>]*>?/gm, '');

    showGenres.textContent = "Genres: " + show.genres.join(", ");
    showPremiere.textContent = "Premiered: " + show.premiered;
    showRating.textContent = "Rating: " + show.rating.average;
    showEnded.textContent = "Ended: " + show.ended;

    card.appendChild(ShowName);
    showDetails.appendChild(showSummary);
    showDetails.appendChild(showGenres);
    showDetails.appendChild(showPremiere);
    showDetails.appendChild(showEnded);
    showDetails.appendChild(showRating);
    showDetails.appendChild(castList);
    showDetails.appendChild(showURL);
    card.appendChild(showDetails);
    console.log(show.name);

    results.appendChild(card);
}

function clearResults() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

//Doesn't work yet
async function clearNoResults(input) {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (input.textContent === '') {
        showDetails.removeChild(input);
    }
}
