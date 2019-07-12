import axios from 'axios';

// require('dotenv').config();

const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5555/api/v1";

class IdeaAPI {
    static postIdea(ideaData) {
        return axios.post(`${baseUrl}/ideas`, ideaData);
    }

    static updateIdea({ ideaId, ideaData }) {
        return axios.put(`${baseUrl}/ideas/${ideaId}`, ideaData);
    }

    static getIdea(ideaId) {
        return axios.get(`${baseUrl}/ideas/${ideaId}`);
    }

    static getIdeas(limit, offset) {
        return axios.get(`${baseUrl}/ideas`);
    }

    static deleteIdea(ideaId) {
        return axios.delete(`${baseUrl}/ideas/${ideaId}`);  
    }
}

export default IdeaAPI;