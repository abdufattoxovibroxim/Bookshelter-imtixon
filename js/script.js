"use strict";

const elLogoutBtn = document.querySelector(".logout-btn")
const elRenderBook = document.querySelector(".render-book")
const elSearchResult = document.querySelector(".search-result");
const elSearchinput = document.querySelector(".search-input")
const elPrevBtn = document.querySelector(".prev-btn")
const elNextBtn = document.querySelector(".next-btn")
const elPag = document.querySelector(".render-pag")
const elOfcanvas = document.querySelector(".offcanvas")
const elBookmarkList = document.querySelector(".bookmark")
const elBookmarkBtn = document.querySelector(".bookmark-btn")

const token = window.localStorage.getItem("token");

if(!token){
    window.location.replace("index.html")
};

elLogoutBtn.addEventListener("click", function() {
    window.localStorage.removeItem("token");

    window.location.replace("index.html")
})


let search = "animal";
let page = "1"
let orederByNewest = "&"

const renderBooks = function(arr){
    elRenderBook.innerHTML = null
    for(let book of arr.items){
        const html = `
        <div class="col-4">
        <div class="render-book__card">
        <img class="render-book__img" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="" width="201"
        height="202">
        <h1 class="render-book__title">${book.volumeInfo.title}</h1>
        <p class="render-book__desc">${book.volumeInfo.authors}</p>
        <p class="render-book__data">${book.volumeInfo.publishedDate}</p>
        <div class="render-book__btn">
        <div>
        <button class="render-book__bookmark bookmark-btn">Bookmark</button>
        <button class="render-book__info " data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight" data-btn-id="${book.id}" aria-controls="offcanvasRight">More
        info</button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">${book.volumeInfo.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <img class="canvas-img" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt=""
                width="222" height="299">
            <p class="canvas-desc">${book.volumeInfo.description}</p>
            <p class="canvas__author">Author: <span
                    class="canvas__author-res">${book.volumeInfo.authors}</span></p>
            <p class="canvas__author">Published : <span
                    class="canvas__author-res">2019</span></p>
            <p class="canvas__author">Publishers: <span
                    class="canvas__author-res">Hollman</span></p>
            <p class="canvas__author">Categories: <span
                    class="canvas__author-res">Computers</span></p>
            <p class="canvas__author">Pages Count: <span
                    class="canvas__author-res">346</span></p>
        </div>
    </div>

        </div>
        <a href="${book.volumeInfo?.previewLink}" class="render-book__read">Read</a>
        </div>
        </div>
        </div>
        `
        elRenderBook.insertAdjacentHTML("beforeend", html)
    }
}

// elBookmarkBtn.addEventListener("click", function(e){

// })



const getBooks = async function(){
    let startIndex = (page - 1) * 10 + 1;

    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=search+${search}&startIndex=${startIndex}${orederByNewest}`);

    const books = await request.json();


    elSearchResult.textContent = `${books.totalItems}`

    renderBooks(books)
    renderBtns(books)
    // renderBookmark(books)
}

elSearchinput.addEventListener("input", function(){
    search = elSearchinput.value;

    getBooks()
})

elPrevBtn.addEventListener("click", function(){
    page--

    getBooks()
});

elNextBtn.addEventListener("click", function(){
    page++

    getBooks()
})

const renderBtns = function (movies){
    elPag.innerHTML = null
    for(let i = 1; i <= Math.ceil(movies.totalItems/10); i++){
        var btn = document.createElement("button")
        btn.setAttribute("class", "btn mx-auto pag-btn btn-primary mt-3 ms-2")
        elPag.style.marginLeft = "auto"
        elPag.style.marginRight = "auto"
        btn.textContent = i
        elPag.appendChild(btn)
    }
}

elPag.addEventListener("click", function(evt){
    elPag.innerHTML = null
    page = evt.target.textContent;
    getBooks()
})

getBooks(search, page)