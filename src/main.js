import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './js/pixabay-api';
import { createGallery, gallery } from './js/render-function';
import icon from './img/icon.svg'

const form = document.querySelector('.form');
const loading = document.querySelector('.loading')
const btnLoadMore = document.querySelector('.load-more')

function scrollAfterLoadind() {
    const imgBox = document.querySelector('.img-box');
    const boxSize = imgBox.getBoundingClientRect();
    if (boxSize.height > 0) {
        let scrollHeight = boxSize.height * 2;
        window.scrollBy({
            top: scrollHeight,
            behavior: 'smooth'
        })
    }
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 100
})

let query;
let page;

form.addEventListener('submit', showGallery)

async function showGallery(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    query = form.search.value.trim().replace(/\s/g, "+");
    if (query && query !== '') {
        page = 1;
        loading.classList.add('loader');
        try {
            const data = await searchImages(query, page);
            if (data.total !== 0) {
                loading.classList.remove('loader');
                createGallery(data.hits);
                lightbox;
                lightbox.refresh();
                btnLoadMore.classList.remove('hidden');
                if (data.totalHits < 15) {
                    btnLoadMore.classList.add('hidden')
                }
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
                btnLoadMore.classList.add('hidden')
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
            loading.classList.remove('loader');
        }
        finally {
            form.reset()  
        }
    } else {
        btnLoadMore.classList.add('hidden');
        return;
    }
}

btnLoadMore.addEventListener('click', loadMore);

async function loadMore() {
    loading.classList.add('loader');
    btnLoadMore.classList.add('hidden');
    page++;
    try {
        const newData = await searchImages(query, page);
        loading.classList.remove('loader');
        createGallery(newData.hits);
        scrollAfterLoadind();
        btnLoadMore.classList.remove('hidden');
        lightbox.refresh();
        if (newData.hits.length < 15) {
            btnLoadMore.classList.add('hidden');
            iziToast.show({
                iconUrl: icon,
                message: `"We're sorry, but you've reached the end of search results`,
                messageColor: '#ffffff',
                color: '#1e81b0',
                position: 'topRight',
                progressBarColor: '#ffffff',
                close: false,
                timeout: 5000
            })
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
} 


