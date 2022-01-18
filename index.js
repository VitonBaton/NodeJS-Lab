const app = require('./src');
const env = require('./src/env');
app.listen(env.app.port, () => console.log(`Server successfully started at port ${env.app.port}`));