const postListDiv = document.querySelector(".post-list");
let postID = 1;
const giphyBut=document.getElementById("giphy-btn");
const gifDiv=document.getElementById("gif-img");
const cont=document.querySelector(".container");
const postContent = document.getElementById("post-content");

function post(id, content, imageUrl) {
     this.id = id;
     this.content = content;
     this.imageUrl=imageUrl;
}


// Add eventListeners 
function eventListeners() {
     // addDefaultposts();
     document.addEventListener("DOMContentLoaded", displayposts);
     document.getElementById("add-post-btn").addEventListener("click", addNewpost);
     postListDiv.addEventListener("click", deletepost);
     document.getElementById("delete-all-btn").addEventListener("click", deleteAllposts);

}

eventListeners();

// get item from storage 
function getDataFromStorage() {
     return localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];
}

//default post
function addDefaultposts() {
     let posts = getDataFromStorage();
     if (posts.length === 0) {
          let postItem = new post(postID, "HelloWorld");
          postID++;
          posts.push(postItem);
          localStorage.setItem("posts", JSON.stringify(posts));
          postItem = new post(postID, "HelloWow");
          postID++;
          posts.push(postItem);
          // saving in the local storage 
          localStorage.setItem("posts", JSON.stringify(posts));
     }
}

// add a new post in the list 

function addNewpost() {
     console.log(gifDiv.src);
     if (validateInput(postContent,gifDiv.src)) {
          let posts = getDataFromStorage();
          let postItem = new post(postID, postContent.value, gifDiv.src);
          postID++;
          posts.push(postItem);
          createpost(postItem);

          // saving in the local storage 
          localStorage.setItem("posts", JSON.stringify(posts));
          postContent.value = "";
          gifDiv.src = "";
     }

}



//  input validation 

function validateInput(content, url) {
     if (content.value !== "") {
          return true;
     } else {
          if (content.value === "") content.classList.add("warning");
     }
     setTimeout(() => {
          content.classList.remove("warning");
     }, 1600);
}


// create a new post div

function createpost(postItem) {
     console.log(postItem);
     const div = document.createElement("div");
     div.classList.add("post-item");
     div.setAttribute("data-id", postItem.id);
     div.innerHTML = `
        <h3>${postItem.content}</h3>
        ${postItem.imageUrl.includes("giphy") ? "<img src="+postItem.imageUrl+" >" : ""} 
        <button type = "button" class = "btn delete-post-btn">
        <span><i class = "fas fa-trash"></i></span>
        &nbsp; Delete
        </button>
  `;
     postListDiv.appendChild(div);
}


// display all the posts from the local storage
function displayposts() {
     let posts = getDataFromStorage();
     if (posts.length > 0) {
          postID = posts[posts.length - 1].id;
          postID++;
     } else {
          postID = 1;
     }
     posts.forEach(item => {
          createpost(item);
     });
}


// delete a post 
function deletepost(e) {
     if (e.target.classList.contains("delete-post-btn")) {

          e.target.parentElement.remove();
          let divID = e.target.parentElement.dataset.id;
          let posts = getDataFromStorage();
          let newpostsList = posts.filter(item => {
               return item.id !== parseInt(divID);
          });
          localStorage.setItem("posts", JSON.stringify(newpostsList));
     }
}


// delete all posts 
function deleteAllposts() {
     localStorage.removeItem("posts");
     let postList = document.querySelectorAll(".post-item");
     if (postList.length > 0) {
          postList.forEach(item => {
               postListDiv.removeChild(item);
          });
     }
     postID = 1 //resetting postID to 1
}

/* For Giphy Container */
/*Grab the input from teh user */
var input = document.querySelector(".container input");
document.querySelector(".container input").addEventListener("keyup", (e) => {
     clearOutput();
     if (e) {
          getData(input.value);
     }
});

/*Get data from the API*/
function getData(input) {
     var API_KEY = "3mIxmBZUIIPyb8R69gtxaW8Hsh74dFKV";
     var url =
          "https://api.giphy.com/v1/gifs/search?api_key=" +
          API_KEY +
          "&q=" +
          input +
          "&limit=25&offset=0&rating=g&lang=en"; /*this will only return maximum  25 gifs at a time*/
     fetch(url)
          .then((response) => response.json())
          .then((data) => showData(data.data))
          .catch((e) => {
               console.log(e);
          });
}
/*Display the output*/
function showData(data) {
     data.forEach((element) => {
          var sorc = element.images.fixed_height.url;
          var output = document.querySelector(".container .output");
          // output.innerHTML += "<img src=" + sorc + " onclick="+"put("+src+")"+" >";
          var ele=document.createElement('img');
          ele.src=sorc;
          ele.onclick= function() { put(sorc); };
          output.appendChild(ele);
     });
}
function put(url){
     gifDiv.src=url;
     if(cont.style.display=="block")
     cont.style.display="none";
}
/*clearing the ouptut*/
function clearOutput() {
     var output = document.querySelector(".container .output");
     // output.innerHTML = "Loading May take time";
     // setTimeout(function(){output.innerHTML = "";},2000);
     output.innerHTML = "";
}

giphyBut.addEventListener("click",function() {
     if(cont.style.display=="block")
     cont.style.display="none";
     else
     cont.style.display="block";
})