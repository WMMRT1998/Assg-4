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




    ShowName.textContent = show.name;
    showSummary.textContent = show.summary;

    showSummary.textContent = showSummary.textContent.replace(/<[^>]*>?/gm, '');

    showGenres.textContent = "Genres: " + show.genres.join(", ");

    card.appendChild(ShowName);
    showDetails.appendChild(showSummary);
    showDetails.appendChild(showGenres);
    showDetails.appendChild(castList);
    card.appendChild(showDetails);
    console.log(show.name);

    results.appendChild(card);
}
