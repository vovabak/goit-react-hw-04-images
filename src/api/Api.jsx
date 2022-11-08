import axios from "axios";

const KEY = '29693902-d7f1c0bc4a2545a8a80ab510a';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(q, page) {
    const params = {
        key: KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page,
    }
      
    const response = await axios.get(BASE_URL, {params});
    return response;    
}