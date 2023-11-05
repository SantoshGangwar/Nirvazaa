
const express = require('express');
const cors = require('cors');
const routes = require('./routes/webapi');
// const User = require('./models/User')
const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'));
 app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
