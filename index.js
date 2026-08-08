import{a as u,S as L,i as g}from"./assets/vendor-CucEYOFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();u.defaults.baseURL="https://pixabay.com/api/";const y=async(e,t)=>{const s="56787016-99e31dc5b616b930e3b2ced26",n=new URLSearchParams({key:s,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15});return(await u.get("",{params:n})).data},a={searchForm:document.querySelector(".js-search-form"),galleryList:document.querySelector(".js-gallery"),preloader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more-btn")},b=new L(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),w=e=>`
    <li class="gallery-card">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="gallery-stats">
          <div class="gallery-stat">
            <div class="gallery-stat-title">Likes</div>
            <div class="gallery-stat-value">${e.likes}</div>
          </div>
          <div class="gallery-stat">
            <div class="gallery-stat-title">Views</div>
            <div class="gallery-stat-value">${e.views}</div>
          </div>
          <div class="gallery-stat">
            <div class="gallery-stat-title">Comments</div>
            <div class="gallery-stat-value">${e.comments}</div>
          </div>
          <div class="gallery-stat">
            <div class="gallery-stat-title">Downloads</div>
            <div class="gallery-stat-value">${e.downloads}</div>
          </div>
        </div>
    </li>
 `;function f(e){const t=e.map(s=>w(s)).join("");a.galleryList.insertAdjacentHTML("beforeend",t),b.refresh()}function M(){a.galleryList.innerHTML=""}function h(){a.preloader.classList.add("is-active")}function v(){a.preloader.classList.remove("is-active")}function p(){a.loadMoreBtn.classList.remove("is-hidden")}function B(){a.loadMoreBtn.classList.add("is-hidden")}let i=1,l,c;const d=async e=>{try{B(),a.loadMoreBtn.removeEventListener("click",d),i++;const t=await y(l,i);h(),i===c&&g.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f(t.hits),S()}catch(t){console.log(t)}finally{v(),p(),a.loadMoreBtn.addEventListener("click",d)}},S=()=>{const e=a.galleryList.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})},P=async e=>{try{e.preventDefault(),console.log("onSearchFormSubmit function called");const{target:t}=e;if(console.log("searchFormEl.elements:",t.elements),l=t.elements["search-text"].value.trim(),console.log("searchedQuery from main.js:",l),!l){alert("Поле для введення не має бути порожнім!");return}M(),h(),a.loadMoreBtn.classList.add("is-hidden"),a.loadMoreBtn.removeEventListener("click",d),i=1;const s=await y(l,i);s.total===0&&g.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.log("data.total from main.js:",s.total),console.log("data from main.js:",s),console.log("data.hits from main.js:",s.hits),f(s.hits),c=Math.ceil(s.totalHits/15),console.log("totalPages from main.js:",c),c>1&&(p(),a.loadMoreBtn.addEventListener("click",d))}catch(t){console.error(t)}finally{v()}};a.searchForm.addEventListener("submit",P);
//# sourceMappingURL=index.js.map
