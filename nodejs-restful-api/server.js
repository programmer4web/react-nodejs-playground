const app = require('./app'),
  port = process.env.PORT || 7070;

let server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
