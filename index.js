const http = require('./server');
const PORT = process.env.PORT || 3000;

http.listen(PORT, function() {
    console.log(`Listening on ${ PORT }`);
});