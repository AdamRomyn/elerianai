import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export default {
  createPoll(poll) {
    console.log(API_URL)
    return axios.post(`${API_URL}/polls`, poll);
  },
  getPoll(id) {
    return axios.get(`${API_URL}/polls/${id}`);
  },
  submitVote(pollId, answer) {
    // Would have probably made the answer id based and assigned an id to each answer if we were using a proper DB. Or used  the ints based on their ordering.
    return axios.post(`${API_URL}/polls/${pollId}/vote`, { answer });
  },
  getAllPolls() {
    return axios.get(`${API_URL}/polls`);
  }
  
};