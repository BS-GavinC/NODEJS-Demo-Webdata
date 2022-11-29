
// import des modules
const readFile = require("./modules/demo-fs");
const {fakeDb, getUserById} = require("./modules/fakeDb");
const http = require('http');
const url = require("url");
const fs = require("fs");
const path = require('path')


// Creation du server NODE
const server = http.createServer((request, response) => {

    //Recuperation des informations de l'url
    const requestURL = url.parse(request.url, true)


    //switch sur base de l'url pathname ex : "/index"
    switch (requestURL.pathname) {

        case '/':
            console.log('Je suis a l\'index')

            // inscription du code server dans le header de la reponse
            response.writeHead(200)

            
            response.end()
            break;

        case '/users':
            response.writeHead(200, {'Content-type' : 'application/json'})

            //envoi de la liste des utilisateur en JSON au client
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

// le serveur ecoute sur le port donné ex :' localhost:1337'

//server.listen(8080) est valide aussi
server.listen(1337, () => {
    console.log('Server listen at http://localhost:1337');
})





