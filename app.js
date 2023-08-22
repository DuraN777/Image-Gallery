const imagesUl = document.querySelector(".js-gallery");
const loadMoreBtn = document.querySelector(".js-load-more");
const searchInput = document.querySelector(".js-search-input");
const galleryWarning = document.querySelector(".js-gallery-warning");
const lightBox = document.querySelector(".js-lightbox");
const closeLightbox = document.querySelector(".js-close-lightbox");

// Api key, pagination and search term
const apiKey = "1r9j7JOFGQW3Du7gtMlApqAAaLJorBuQCZz6kmS70Has7vpKpBNzUejm";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

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
    if(data.photos.length === 0) {
      galleryWarning.style.display = "block";
      loadMoreBtn.style.display = "none";
    }
    else {
      galleryWarning.style.display = "none";
      loadMoreBtn.style.display = "block";
    }
    generateHTML(data.photos);
  })
  .catch(err => console.log("Something went wrong", "\n" + err))
}

function generateHTML(images) {
  //Making <li> of all fetched images and adding them to existing <ul> gallery
  console.log(images)
  imagesUl.innerHTML += images.map((img) => 
  `<li class="gallery__card" onclick="showLightbox('${img.photographer}', '${img.src.large2x}')">
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

function loadMoreImages() {
  currentPage++;
  let apiURl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  getImages(apiURl);
}

function loadSearchImages(e) {
  // After search input is entered, update current page, searchTerm and call the getImages()
  if(e.target.value === "") return searchTerm = null;
  if(e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesUl.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    searchInput.value = "";
  }
}

function showLightbox(name, img) {
  lightBox.querySelector(".lightbox__card-photographer").innerText = name;
  lightBox.querySelector(".lightbox__img").src = img;
  lightBox.classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideLightbox() {
  lightBox.classList.remove("show");
  document.body.style.overflow = "auto";
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeLightbox.addEventListener("click", hideLightbox);
