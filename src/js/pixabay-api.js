export function searchImages(query) {
    const KEY = '42530845-4f1978a0628226c655e2788d5';
    const BASE_URL = 'https://pixabay.com/api/';
    const LINK = `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    
    return fetch(LINK)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
}
    


