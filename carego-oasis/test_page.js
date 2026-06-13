const http = require('http');
http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<div id="__nuxt">[\s\S]*?<\/div>/);
    if (match) console.log(match[0].substring(0, 800));
  });
});
