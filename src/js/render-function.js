export const gallery = document.querySelector('.gallery');

function newImages({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `<a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}"/>
                <div class="info-box">
                    <p class="info"><b>Likes</b> ${likes}</p>
                    <p class="info"><b>Views</b> ${views}</p>
                    <p class="info"><b>Comments</b> ${comments}</p>
                    <p class="info"><b>Downloads</b> ${downloads}</p>
                </div>
            </a>`
};

export function createGallery(elements) {
    const markup = elements.map(newImages).join('');
    return gallery.insertAdjacentHTML('beforeEnd', markup);
};
