var express = require('express');
var moment = require('moment');

var app = express();

app.get("/:date?", function (request, response) {
  var date = request.params.date;
  
  if (!date) {
    return response.json(buildResponse());
  }
  
  if (moment(date).toString() === 'Invalid date' && moment.unix(date).toString() === 'Invalid date') {
    return response.json(buildResponse());
  }
  
  date = date.toString();
  
  if (date.indexOf(',') !== -1) {
    return response.json(buildResponse(moment(date).unix(), date));
  }
  
  return response.json(buildResponse(Number(date), moment.unix(date).format('MMMM DD, YYYY')));
});

app.listen(3000);

var buildResponse = function(unix, natural) {
  return {
    unix: unix ? unix : null,
    natural: natural ? natural : null
  }
}