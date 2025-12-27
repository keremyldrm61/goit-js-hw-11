import{S as d,i as l}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const c=document.querySelector("#search-form"),u=document.querySelector(".gallery"),n=document.querySelector(".loader");let f=new d(".gallery a",{captionsData:"alt",captionDelay:250});c.addEventListener("submit",i=>{i.preventDefault();const r=i.target.elements.query.value.trim();if(r===""){l.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}n.style.display="block",u.innerHTML="",n.classList.remove("is-hidden");const s=`https://pixabay.com/api/?key=53911590-e6659ac7d11975246b1e78aef&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(s).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{if(n.style.display="none",e.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb"});return}const t=e.hits.map(o=>p(o)).join("");u.insertAdjacentHTML("beforeend",t),f.refresh()}).catch(e=>{n.style.display="none",console.log(e),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}).finally(()=>{n.classList.add("is-hidden"),c.reset()})});function p({webformatURL:i,largeImageURL:r,tags:a,likes:s,views:e,comments:t,downloads:o}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img class="gallery-image" src="${i}" alt="${a}" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${s}</p>
        <p><b>Views</b> ${e}</p>
        <p><b>Comments</b> ${t}</p>
        <p><b>Downloads</b> ${o}</p>
      </div>
    </li>
  `}
//# sourceMappingURL=index.js.map
