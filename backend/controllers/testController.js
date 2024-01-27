const get = (req, res) => {
  res.json({ get: 'get request' });
};

const post = (req, res) => {
  res.json({ post: 'post request' });
};

module.exports = { get, post };
