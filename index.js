const accessKey = "0fXm60phK5S20KiyxVW0Z62ky4HBCjxlhMfPKUP5zO0";

// Elements
const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more");

// Dynamic data
let inputData = "";
let page = 1;

async function searchImage() {
  // Get search input from the user
  inputData = searchInput.value;
  // Construct the URL for the Unsplash API
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  console.log(url);

  // Fetch data from the Unsplash API
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  // Extract the 'results' array from the API response
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = ""; //still not show show more btn
  }

  // Create and display image elements for each result
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    // Create an anchor (link) element for the image
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    // Create an image element
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    // Create a paragraph element for the description
    const text = document.createElement("p");
    text.textContent = result.alt_description;

    // Append the image and text to the link
    imageLink.appendChild(image);
    imageLink.appendChild(text);

    // Append the link to the image wrapper
    imageWrapper.appendChild(imageLink);

    // Append the image wrapper to the search results container
    searchResults.appendChild(imageWrapper);
  });

  // Increment the page counter if scroll down
  page++;
  // Display the "Show More" button if it's not the first page
  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

// Attach a 'submit' event listener to the form element
form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset the page counter to 1 for a new search
  searchImage(); //Call function to perform image search
});

//add event for show more btn
showMoreBtn.addEventListener("click", (event) => {
  searchImage(); //call func again
});
