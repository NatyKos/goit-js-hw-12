import{a as L,S as v,i as d}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();async function g(t,e){const r="https://pixabay.com/api/";return(await L.get(r,{params:{key:"42530845-4f1978a0628226c655e2788d5",q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}const h=document.querySelector(".gallery");function w({largeImageURL:t,webformatURL:e,tags:r,likes:l,views:o,comments:s,downloads:f}){return`<a class = 'img-box' href="${t}">
                <img src="${e}" alt="${r}"/>
                <div class="info-box">
                    <p class="info"><b>Likes</b> ${l}</p>
                    <p class="info"><b>Views</b> ${o}</p>
                    <p class="info"><b>Comments</b> ${s}</p>
                    <p class="info"><b>Downloads</b> ${f}</p>
                </div>
            </a>`}function y(t){const e=t.map(w).join("");return h.insertAdjacentHTML("beforeend",e)}const u="/goit-js-hw-12/assets/icon-8fe9c699.svg",m=document.querySelector(".form"),i=document.querySelector(".loading"),a=document.querySelector(".load-more");function S(){const e=document.querySelector(".img-box").getBoundingClientRect();if(e.height>0){let r=e.height*2;window.scrollBy({top:r,behavior:"smooth"})}}const p=new v(".gallery a",{captionsData:"alt",captionDelay:100});let n,c;async function b(){const e=(await g(n,c)).totalHits/15;c>=e&&(a.classList.add("hidden"),d.show({iconUrl:u,message:"We're sorry, but you've reached the end of search results",messageColor:"#ffffff",color:"#1e81b0",position:"topRight",progressBarColor:"#ffffff",close:!1,timeout:5e3}))}m.addEventListener("submit",x);async function x(t){if(t.preventDefault(),h.innerHTML="",n=m.search.value.trim().replace(/\s/g,"+"),n&&n!==""){c=1,i.classList.add("loader");try{const e=await g(n,c);e.totalHits!==0?(i.classList.remove("loader"),y(e.hits),p.refresh(),a.classList.remove("hidden"),b()):(d.show({iconUrl:u,message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",color:"#FF6868",position:"topRight",progressBarColor:"#ffffff",close:!1,timeout:5e3}),i.classList.remove("loader"),a.classList.add("hidden"))}catch(e){d.show({iconUrl:u,message:`Sorry, there is a problem - ${e}!`,messageColor:"#ffffff",color:"#FF7F50",position:"topRight",progressBarColor:"#ffffff",close:!1,timeout:5e3}),console.log(e),i.classList.remove("loader")}finally{m.reset()}}else{a.classList.add("hidden");return}}a.addEventListener("click",q);async function q(){a.classList.add("hidden"),i.classList.add("loader"),c++;const t=await g(n,c);i.classList.remove("loader"),y(t.hits),S(),a.classList.remove("hidden"),p.refresh(),b()}
//# sourceMappingURL=commonHelpers.js.map