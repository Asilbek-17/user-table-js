const elUserList = document.querySelector(".users-list");
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector(".comment-list");
const elTemplate = document.querySelector(".temp-js").content;
const elTemplate1 = document.querySelector(".temp1-js").content;
const elTemplate2 = document.querySelector(".temp2-js").content;
const Fragment  = document.createDocumentFragment()
//  Functions
async function getUsers(url) {
    try {
        const rec = await fetch(url)
        
        const data = await rec.json()
        renderUsers(data)
    } catch (error) {
        console.log(error);
    }
}


const postsArr = []
async function getPosts(url) {
    try {
        const rec = await fetch(url)
        
        const data = await rec.json()
        
        data.forEach(item => {
            postsArr.push(item)
        })
    } catch (error) {
        console.log(error);
    }
}
getPosts("https://jsonplaceholder.typicode.com/posts");

const CommentsArr = []
async function getComment(url) {
    try {
        const rec = await fetch(url)
        
        const data = await rec.json()
        
        data.forEach(item => {
            postsArr.push(item)
        })
    } catch (error) {
        console.log(error);
    }
}
getComment("https://jsonplaceholder.typicode.com/comments");

function renderUsers(arr) {
    arr.forEach(item => {
        const elTemplateClone = elTemplate.cloneNode(true);
        elTemplateClone.querySelector(".user-id").textContent = item.id;
        elTemplateClone.querySelector(".js-btn").dataset.id = item.id;
        elTemplateClone.querySelector(".user-title").textContent = item.username;
        elTemplateClone.querySelector(".user-text").textContent = item.name;
        elTemplateClone.querySelector(".gmail-link").href ="mailto:" + item.email;
        elTemplateClone.querySelector(".gmail-link").textContent = item.email;
        elTemplateClone.querySelector(".map-link").href ="https://www.google.com/maps/place/" + item.address.geo.lat + "," + item.address.geo.lng;
        elTemplateClone.querySelector(".num-link").href ="tel:" + item.phone;
        elTemplateClone.querySelector(".comp-link").href = item.website;
        elTemplateClone.querySelector(".comp-link").textContent = item.website;
        elTemplateClone.querySelector(".company-title").textContent = item.company.name;
        elTemplateClone.querySelector(".company-info").textContent = item.company.catchPhrase;
        elTemplateClone.querySelector(".company-info2").textContent = item.company.bs;
        
        
        Fragment.appendChild(elTemplateClone)
    });
    elUserList.appendChild(Fragment)
}

function renderPosts(obj) {
    const elTemplateClone = elTemplate1.cloneNode(true);
    elTemplateClone.querySelector(".post-id").textContent = obj.id;
    elTemplateClone.querySelector(".js-btn2").dataset.id = obj.id;
    elTemplateClone.querySelector(".post-title").textContent = obj.title;
    elTemplateClone.querySelector(".post-text").textContent = obj.body;
    
    
    elPostList.appendChild(elTemplateClone);
}

function renderComments(obj) {
    const elTemplateClone = elTemplate2.cloneNode(true);
    elTemplateClone.querySelector(".post-id").textContent = obj.id;
    elTemplateClone.querySelector(".comment-title").textContent = obj.name;
    elTemplateClone.querySelector(".comment-text").textContent = obj.body;
    
    
    elCommentList.appendChild(elTemplateClone);
}

// Events

elUserList.addEventListener("click", function(evt){
    if (evt.target.matches(".js-btn")) {
        elPostList.innerHTML = "";
        const itemId = evt.target.dataset.id;
        postsArr.forEach(item => {
            if(item.userId == itemId) {
                renderPosts(item)
            }
        })
    }
})

elPostList.addEventListener("click", function(evt){
    if (evt.target.matches(".js-btn2")) {
        elCommentList.innerHTML = "";
        const itemId = evt.target.dataset.id;
        postsArr.forEach(item => {
            if(item.postId == itemId) {
                renderComments(item)
            }
        })
    }
})

getUsers("https://jsonplaceholder.typicode.com/users");
