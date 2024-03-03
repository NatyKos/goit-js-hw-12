import axios from "axios";

export async function searchImages(query, page) {
    const baseURL = 'https://pixabay.com/api/';
    const response = await axios.get(baseURL, {
        params: {
            key: '42530845-4f1978a0628226c655e2788d5',
            q: `${query}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,
            page: page
        }
    }
    )
    return response.data
}

