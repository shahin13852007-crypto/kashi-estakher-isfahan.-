// ============================
// Firebase Imports
// ============================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ============================
// Firebase Config
// ============================

const firebaseConfig = {

    apiKey: "AIzaSyABScoFbGeaGAbKw1sL15tTg4XzfKXZsBY",

    authDomain:
    "kashi-estakher-isfahan.firebaseapp.com",

    projectId:
    "kashi-estakher-isfahan",

    storageBucket:
    "kashi-estakher-isfahan.firebasestorage.app",

    messagingSenderId:
    "346287852288",

    appId:
    "1:346287852288:web:100ec198e56ede096741e5"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// ============================
// Smooth Scroll
// ============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function(e) {

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute('href')
        );

        if(target){

            target.scrollIntoView({

                behavior: 'smooth',
                block: 'start'

            });

        }

    });

});

// ============================
// Header Scroll Effect
// ============================

const header =
document.querySelector('header');

window.addEventListener('scroll', () => {

    if(!header) return;

    if(window.scrollY > 80){

        header.style.padding =
        "12px 8%";

        header.style.boxShadow =
        "0 5px 25px rgba(0,0,0,.15)";

    }else{

        header.style.padding =
        "18px 8%";

        header.style.boxShadow =
        "0 2px 20px rgba(0,0,0,.08)";

    }

});

// ============================
// Reveal Animation
// ============================

const revealElements =
document.querySelectorAll(
'.service-card, .project-card, .gallery-grid img'
);

function revealOnScroll(){

    revealElements.forEach(el => {

        const top =
        el.getBoundingClientRect().top;

        const windowHeight =
        window.innerHeight;

        if(top < windowHeight - 100){

            el.classList.add('active');

        }

    });

}

window.addEventListener(
'scroll',
revealOnScroll
);

revealOnScroll();

// ============================
// Back To Top
// ============================

const backToTop =
document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.id = "backToTop";

document.body.appendChild(backToTop);

backToTop.style.position = "fixed";
backToTop.style.right = "25px";
backToTop.style.bottom = "30px";
backToTop.style.width = "55px";
backToTop.style.height = "55px";
backToTop.style.border = "none";
backToTop.style.borderRadius = "50%";
backToTop.style.background = "#0d6efd";
backToTop.style.color = "#fff";
backToTop.style.fontSize = "24px";
backToTop.style.cursor = "pointer";
backToTop.style.display = "none";
backToTop.style.zIndex = "999";
backToTop.style.boxShadow =
"0 10px 20px rgba(0,0,0,.2)";

window.addEventListener('scroll', () => {

    if(window.scrollY > 400){

        backToTop.style.display =
        "block";

    }else{

        backToTop.style.display =
        "none";

    }

});

backToTop.addEventListener(
'click',
() => {

window.scrollTo({

    top: 0,
    behavior: 'smooth'

});

});

// ============================
// Hover Cards
// ============================

const cards =
document.querySelectorAll(
'.service-card, .project-card'
);

cards.forEach(card => {

    card.addEventListener(
    'mouseenter',
    () => {

        card.style.transform =
        "translateY(-10px)";

    });

    card.addEventListener(
    'mouseleave',
    () => {

        card.style.transform =
        "translateY(0px)";

    });

});

// ============================
// Footer Year
// ============================

const footer =
document.querySelector("footer p");

if(footer){

footer.innerHTML =
`© ${new Date().getFullYear()} تمامی حقوق برای کاشی استخری اصفهان محفوظ است.`;

}

// ============================
// Mobile Menu
// ============================

const menuToggle =
document.querySelector(".menu-toggle");

const navbar =
document.querySelector(".navbar");

if(menuToggle && navbar){

menuToggle.addEventListener(
"click",
() => {

navbar.classList.toggle("active");

});

}

// ============================
// Firebase Comments
// ============================

const commentForm =
document.getElementById("commentForm");

const commentsList =
document.getElementById("commentsList");

if(commentForm && commentsList){

commentForm.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const name =
document.getElementById("name").value;

const text =
document.getElementById("comment").value;

if(
name.trim()===""
||
text.trim()===""
){

alert(
"لطفاً همه فیلدها را تکمیل کنید"
);

return;

}

try{

await addDoc(

collection(db,"comments"),

{

name,

text,

date:new Date()
.toLocaleDateString("fa-IR")

}

);

commentForm.reset();

alert("نظر شما ثبت شد");

}catch(error){

console.error(error);

alert(
"خطا در ثبت نظر"
);

}

}
);

const q =
query(
collection(db,"comments")
);

onSnapshot(
q,
(snapshot)=>{

commentsList.innerHTML = "";

snapshot.forEach((doc)=>{

const data =
doc.data();

commentsList.innerHTML += `

<div class="comment-item">

<div class="comment-header">

<span class="comment-name">
${data.name}
</span>

<span class="comment-date">
${data.date}
</span>

</div>

<div class="stars">
★★★★★
</div>

<div class="comment-text">
${data.text}
</div>

</div>

`;

});

});

}