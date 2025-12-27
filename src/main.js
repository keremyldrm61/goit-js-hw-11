// Kütüphaneler
// Dokümantasyonda belirtilen import
import iziToast from 'izitoast';
// Stil importu
import 'izitoast/dist/css/iziToast.min.css';
// Dokümantasyonda belirtilen import
import SimpleLightbox from 'simplelightbox';
// Stil importu
import 'simplelightbox/dist/simple-lightbox.min.css';

// DOM Referansları
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

// SimpleLightbox sınıfı oluşturup biçimlendirmek için
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();

  // Eğer veri boşsa uyarı mesajı
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: "topRight",
    });
    return;
  }

  loader.style.display = "block";

  // Galeriyi temizleyip loader'ı göstermek için
  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');

  // HTTP İsteği Yapmak için
  const API_KEY = '53911590-e6659ac7d11975246b1e78aef';
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      // Başarılı yanıtta loader'ı gizlemek için
      loader.style.display = "none";
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: '#fafafb',
        });
        return;
      }

      // 3. Markupları oluştur ve DOM'a tek seferde ekle
      const markup = data.hits.map(image => createMarkup(image)).join('');
      gallery.insertAdjacentHTML('beforeend', markup);

      // 4. Galeri kütüphanesini yenile
      lightbox.refresh();
    })
    .catch(error => {
      // Hata durumunda da loader'ı gizlemek için
      loader.style.display = "none";
      console.log(error);
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    })
    .finally(() => {
      // 5. İşlem bittiğinde loader'ı gizle
      loader.classList.add('is-hidden');
      form.reset();
    });
});

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${likes}</p>
        <p><b>Views</b> ${views}</p>
        <p><b>Comments</b> ${comments}</p>
        <p><b>Downloads</b> ${downloads}</p>
      </div>
    </li>
  `;
}