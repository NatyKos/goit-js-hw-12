import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './js/pixabay-api';
import { createGallery, gallery } from './js/render-function';
import icon from './img/icon.svg'

const form = document.querySelector('.form');
const loading = document.querySelector('.loading')

form.addEventListener('submit', showGallery)

async function showGallery(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    const query = form.search.value.trim().replace(/\s/g, "+");
    if (query && query !== '') {
        let page = 1;
        loading.classList.add('loader');
        try {
            const data = await searchImages(query, page);
            if (data.total !== 0) {
                loading.classList.remove('loader');
                createGallery(data.hits);
                const lightbox = new SimpleLightbox('.gallery a', {
                    captionsData: 'alt',
                    captionDelay: 100
                });
                lightbox.refresh();
            } else {
                iziToast.show({
                    iconUrl: icon,
                    message: `Sorry, there are no images matching your search query. Please try again!`,
                    messageColor: '#ffffff',
                    color: '#FF6868',
                    position: 'topRight',
                    progressBarColor: '#ffffff',
                    close: false,
                    timeout: 5000
                });
                loading.classList.remove('loader');
            }
        }
        catch (error) {
            iziToast.show({
                iconUrl: icon,
                message: `Sorry, there is a problem - ${error}!`,
                messageColor: '#ffffff',
                color: '#FF7F50',
                position: 'topRight',
                progressBarColor: '#ffffff',
                close: false,
                timeout: 5000
            });
            console.log(error);
            loading.classList.remove('loader')
        }
        finally {
            form.reset()
        }
    }
}

   



