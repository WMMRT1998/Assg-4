const tvUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";

let id = (id) => document.getElementById(id);


let submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", async function (event) {
    event.preventDefault();
    let params = new FormData(id("input-form"));

    const response = await fetch(tvUrl + encodeURIComponent(params.get("Show")));

    const shows = await response.json();

    console.log(shows);
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
