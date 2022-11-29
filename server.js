const readFile = require("./modules/demo-fs");
const {fakeDb, getUserById} = require("./modules/fakeDb");
const http = require('http');
const url = require("url");
const fs = require("fs");
const path = require('path')



const server = http.createServer((request, response) => {

    const requestURL = url.parse(request.url, true)

    switch (requestURL.pathname) {



        case '/':
            console.log('Je suis a l\'index')
            response.writeHead(200)
            response.end()
            break;

        case '/users':
            response.writeHead(200, {'Content-type' : 'application/json'})
            response.end(JSON.stringify(fakeDb.users))
            break;

        case '/user':
            if (requestURL.query.id) {
                const user = getUserById(requestURL.query.id)
                if (user) {
                    response.writeHead(200, {'Content-type' : 'application/json'})
                    response.end(JSON.stringify(user))
                }
                else{
                    response.writeHead(400)
                    response.end('Tu fait n\'imp toto') 
                }
                
            }
            else{
                response.writeHead(400)
                response.end('Tu fait n\'imp toto')
            }
            break;

        case '/index':
            const fileDir = path.resolve('./', 'view', 'index.html')
            fs.readFile(fileDir, (err, data) => {
                response.writeHead(200, {'Content-type' : 'text/html'})
                response.end(data)
            })
            break;
    
        default:
            response.writeHead(404)
            response.end('Fichier introuvable')
            break;
    }
    

})


server.listen(1337, () => {
    console.log('Server listen at http://localhost:1337');
})





