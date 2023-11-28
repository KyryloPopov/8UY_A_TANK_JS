(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const i="https://food-boutique.b.goit.study/api",a={keyword:null,category:null,page:1,limit:6};async function y(){JSON.parse(localStorage.getItem("search-parameters"))||g(a);const e=await u(a);document.querySelector(".product-items").innerHTML=l(e.results),d(e.totalPages),L(),v(),h(),document.querySelector(".search-form").addEventListener("submit",$)}function d(t){let e=document.querySelector(".product-btn-scroll"),r=[];for(let o=1;o<=t;o++)r.push('<li><button class="change-page" data-page="'+o+'">'+o+"</button></li>");e.innerHTML=r;var c=document.querySelectorAll(".change-page");for(let o=0;o<c.length;o++)c[o].addEventListener("click",async function(){a.page=this.getAttribute("data-page");const s=await u(a);document.querySelector(".product-items").innerHTML=l(s.results)})}async function h(){try{const t=await C(),e=document.querySelector(".products-container"),r=p(t);console.log(r),e.innerHTML=r}catch(t){console.error("Error rendering discount products:",t)}}async function C(){try{const e=await(await fetch(`${i}/products/popular`)).json();return console.log(e),e}catch(t){console.error("Error fetching discount products:",t)}}async function v(){try{const t=await w(),e=document.querySelector("ul.discount-list"),r=p(t);e.innerHTML=r}catch(t){console.error("Error rendering discount products:",t)}}async function w(){try{return await(await fetch(`${i}/products/discount`)).json()}catch(t){console.error("Error fetching discount products:",t)}}function p(t){let e="";for(let r=0;r<2;r++){const c=`<li class="discount-card" data-id="${t[r]._id}">
            <img class="discount-label" src="./img/discount.png" alt="discount">
            <div class="product-photo">
                <img class="product-img" src="${t[r].img}">
            </div>
            <div class="product-details">
                <p class="product-name">${t[r].name}</p>
                <div class="discount-price-flex">
                    <p class="product-price">$${t[r].price}</p>
                    <a href="./cart.html" class="add-to-cart-icon">
                        <svg class="cart-icon">
                            <use href="./img/kupi-tank-sprite.svg#icon-basket"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </li>`;e+=c}return e}function g(t){localStorage.setItem("search-parameters",JSON.stringify(t))}function k(){return JSON.parse(localStorage.getItem("search-parameters"))}async function u(t){try{let e=`${i}/products?`;return console.log(t.keyword),t.keyword&&(e+=`keyword=${t.keyword}&`),t.category&&(e+=`category=${t.category}&`),e+=`page=${t.page}&limit=6`,await(await fetch(e)).json()}catch(e){console.error("Error fetching products:",e)}}async function L(){try{const t=document.querySelector(".categorySelect"),e=await S(),r=P(e);t.innerHTML=r}catch(t){console.error("Error rendering categories:",t)}}async function S(){try{return await(await fetch(`${i}/products/categories`)).json()}catch(t){console.error("Error fetching categories:",t)}}function P(t){let e=t.map(r=>`<option value="${r}">${r.replaceAll("_"," ")}</option>`).join("");return e+='<option value="" selected>Show All</option>',e}y();async function $(t){try{t.preventDefault();const e={keyword:t.target.elements.keyword.value,category:t.target.elements.category.value,page:a.page,limit:6};b(e)||g(e);const r=document.querySelector(".product-items"),c=await u(e);console.log(c.results);const o=l(c.results);d(c.totalPages),console.log(o),r.innerHTML=o}catch{}}function l(t){return t.map(({_id:r,name:c,img:o,category:s,size:n,popularity:f,is10PercentOff:E,price:m})=>`<li class="product-card list" data-id="${r}">

            <div class="product-card-img">
                <img src="${o}">
            </div>
            <h2 class="product-name">${c}</h2>
            <div class="category-list">
                <p class="product-category">Category: <span class="category-value">${s.replaceAll("_"," ")}</span></p>
                <p class="product-category">Size: <span class="category-value">${n}</span></p>
                <p class="product-category">Popularity: <span class="category-value">${f}</span></p>
            </div>
            <div class="add-to-cart">
                <p class="product-price">$${m}</p>
                <button type="button" class="add-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M2.69999 0.899994C2.46129 0.899994 2.23237 0.994815 2.06359 1.1636C1.89481 1.33238 1.79999 1.5613 1.79999 1.79999C1.79999 2.03869 1.89481 2.26761 2.06359 2.43639C2.23237 2.60517 2.46129 2.69999 2.69999 2.69999H3.79799L4.07249 3.79979C4.07521 3.81246 4.07822 3.82506 4.08149 3.83759L5.30369 8.72459L4.49999 9.52739C3.36599 10.6614 4.16879 12.6 5.77259 12.6H13.5C13.7387 12.6 13.9676 12.5052 14.1364 12.3364C14.3052 12.1676 14.4 11.9387 14.4 11.7C14.4 11.4613 14.3052 11.2324 14.1364 11.0636C13.9676 10.8948 13.7387 10.8 13.5 10.8H5.77259L6.67259 9.89999H12.6C12.7671 9.8999 12.9309 9.8533 13.073 9.7654C13.2151 9.67749 13.3299 9.55177 13.4046 9.40229L16.1046 4.00229C16.1731 3.86512 16.2055 3.7127 16.1986 3.5595C16.1917 3.4063 16.1458 3.25741 16.0652 3.12695C15.9846 2.99649 15.872 2.88879 15.738 2.81406C15.6041 2.73934 15.4533 2.70008 15.3 2.69999H5.65199L5.37299 1.58129C5.32423 1.38667 5.21184 1.21392 5.05367 1.09048C4.8955 0.967046 4.70062 0.899999 4.49999 0.899994H2.69999ZM14.4 14.85C14.4 15.208 14.2578 15.5514 14.0046 15.8046C13.7514 16.0578 13.408 16.2 13.05 16.2C12.6919 16.2 12.3486 16.0578 12.0954 15.8046C11.8422 15.5514 11.7 15.208 11.7 14.85C11.7 14.492 11.8422 14.1486 12.0954 13.8954C12.3486 13.6422 12.6919 13.5 13.05 13.5C13.408 13.5 13.7514 13.6422 14.0046 13.8954C14.2578 14.1486 14.4 14.492 14.4 14.85ZM5.84999 16.2C6.20803 16.2 6.55141 16.0578 6.80458 15.8046C7.05776 15.5514 7.19999 15.208 7.19999 14.85C7.19999 14.492 7.05776 14.1486 6.80458 13.8954C6.55141 13.6422 6.20803 13.5 5.84999 13.5C5.49195 13.5 5.14857 13.6422 4.89539 13.8954C4.64222 14.1486 4.49999 14.492 4.49999 14.85C4.49999 15.208 4.64222 15.5514 4.89539 15.8046C5.14857 16.0578 5.49195 16.2 5.84999 16.2Z"
                            fill="#E8E8E2" />
                    </svg>
                </button>
            </div>
        </li>`).join("")}function b(t){const e=Object.keys(t),r=k();for(const c of e)if(t[c]!==r[c])return!1;return!0}
//# sourceMappingURL=main-a5b94aa5.js.map
