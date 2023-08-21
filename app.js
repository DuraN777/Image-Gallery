const imagesUl = document.querySelector(".js-gallery");

// Api key, pagination
const apiKey = '1r9j7JOFGQW3Du7gtMlApqAAaLJorBuQCZz6kmS70Has7vpKpBNzUejm';
const perPage = 15;
let currentPage = 1;

function getImages(apiURL) {
  fetch(apiURL, {
    headers: {Authorization: apiKey}
  })
  .then(res => {
    if(!res.ok) {
      throw new Error(`Status code of error: ${res.status}`)
    }
    return res.json();
  })
  .then(data => {
    generateHTML(data.photos);
  })
  .catch(err => console.log("Something went wrong", "\n" + err))
}

function generateHTML(images) {
  //Making <li> of all fetched images and adding them to existing <ul> gallery
  console.log(images)
  imagesUl.innerHTML += images.map((img) => 
  `<li class="gallery__card">
    <img class="gallery__card-img" src="${img.src.large2x}" alt="${img.alt}">
    <div class="gallery__card-details">
      <div class="gallery__card-content">
        <i class="fa-solid fa-camera"></i>
        <span class="gallery__card-photographer">${img.photographer}</span>
      </div>
      <button class="gallery__card-btn">
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  </li>`
).join("")
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);