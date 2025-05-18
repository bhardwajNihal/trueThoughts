import axios from "axios";

export async function getPixabayImage(query) {
    try {
        
        const res = await axios.get(`https://pixabay.com/api?key=${process.env.PIXABAY_API_KEY}&q=${query}&min_width=1000&min_height=500&image_type=illustration&category=feelings`)
        return res.data.hits[0]?.largeImageURL || null;
    } catch (error) {
        console.error("Error fetching Pixabay image !", error);
    }
}