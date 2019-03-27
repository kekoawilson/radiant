const port = 3001;
module.exports = {
    port: port,
    apiKey: '', // Request api key from dev-ops
    perpage: 25,
    searchAPI: `http://localhost:${port}/api/search`
};
