const index = require('./index');
const mongoose = require('mongoose');

// MONGOOSE SETUP
const app = index.makeApp(mongoose);
const PORT = process.env.ANALYSIS_SERVER_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
