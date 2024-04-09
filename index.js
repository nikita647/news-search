const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    //find the card container  when the news cadrd will be appended
    const cardsContainer = document.getElementById("cards-container");
    //then find template for single news card
    const newsCardTemplate = document.getElementById("template-news-card");
//then clear the existing content in cardcontainer
    cardsContainer.innerHTML = "";
//it iterates through each article in the articles array
    articles.forEach((article) => {
//For each article, it checks if it has an image URL (urlToImage). If not, it skips that article.
        if (!article.urlToImage) return;
        //it clone the template using cloneNode(true) to create a deep copy 
        const cardClone = newsCardTemplate.content.cloneNode(true);
        //it fill the data for the current article 
        fillDataInCard(cardClone, article);
        // then it append the filled card clone to the card container
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    //when we click on new nav item them remove active from previouse nav link
    curSelectedNav?.classList.remove("active");
    //then the current item will be  new navitem
    curSelectedNav = navItem;
    // we add active class in it
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    //when the user not type but hit the the button in this case it will simply return
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});




/*

The API_KEY variable holds your News API key.
The url variable holds the base URL for the News API.

When the window loads, it executes the fetchNews("India") function, fetching news related to India.


This function fetches news data based on the provided query using the News API.
It appends the API key to the URL to authenticate the request.
It then calls the bindData function to display the fetched news articles.


This function populates the UI with news articles.
It clears the existing content in the cardsContainer.
For each article, it clones the template, fills in the data, and appends it to the cardsContainer.



*/









