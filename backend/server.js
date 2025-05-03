const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GitHub client with your token
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
});

// Rate limit endpoint
app.get('/api/rate-limit', async (req, res) => {
  try {
    const response = await github.get('/rate_limit');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GitHub search repositories
app.get('/api/github/search/repositories', async (req, res) => {
  try {
    const response = await github.get('/search/repositories', { params: req.query });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// GitHub repository issues
app.get('/api/github/repos/:owner/:repo/issues', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await github.get(`/repos/${owner}/${repo}/issues`, { params: req.query });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
});

// Home route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'GitHub API proxy is running' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });