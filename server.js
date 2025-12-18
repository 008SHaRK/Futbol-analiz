const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{

  if(req.url === "/api/matches"){

    res.writeHead(200, {
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"GET",
      "Content-Type":"application/json"
    });

    fs.readFile("matches.json","utf8",(err,data)=>{
      res.end(data);
    });

  } else {
    res.writeHead(404);
    res.end("Not found");
  }

});

server.listen(4000,()=>{
  console.log("running 4000");
});

