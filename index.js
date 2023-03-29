const express = require('express');
const app = express();
const axios = require('axios');
const now = new Date();
const options = { timeZone: 'Asia/Kolkata' };
const date = now.toLocaleDateString('en-US', options);
const time = now.toLocaleTimeString('en-US', options);
const istDateTime = `${date} ${time}`;

app.use('/public', express.static(__dirname + "/index.html"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  const ip = req.header('x-forwarded-for'); 
  console.log(`New Visit from IP: ${ip}`)
  const url = `http://ip-api.com/json/${ip}`;
  axios.get(url)
  .then(response => {
    console.log(`Country: ${response.data.country}`);
    console.log(`Region: ${response.data.regionName}`);
    console.log(`City: ${response.data.city}`);
    console.log(`ZipCode: ${response.data.zip}`);
    console.log(`Latitude Longitude: ${response.data.lat} || ${response.data.lon}`)
    console.log(`Timezone: ${response.data.timezone}`);
    console.log(`ISP: ${response.data.isp}`);
    console.log(`Time: ${istDateTime}`)
    console.log("===================")
  })
  .catch(error => {
    console.log(`Error while tracking details:\n${error}`);
  });
})

app.listen(3000, function() {
      console.log('Ready to Grab IPs on Port 3000.');
      console.log("===================")
});
