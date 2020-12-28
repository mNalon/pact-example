const axios = require('axios').default;

const API_BASE_URL = process.env.API_BASE_URL

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000
});

const getPeople = () =>
  client.get('/people').then(({ data }) => data)

const getPersonById = (id) => 
  client.get(`person/${id}`).then(({ data }) => data)

module.exports = { getPeople, getPersonById }