const fs = require('fs')
const fspromise = require('fs/promises')
const path = require('path')


const readFileChiant = (fileName) => {

    const fileDir = path.resolve('./', 'files', fileName)

    console.log(fileDir);

    fs.open(fileDir, 'r', (err, fd) => {

        const buffer = Buffer.alloc(18)

        fs.read(fd, buffer, 0, buffer.length, 0, (err, nbrBytes) => {
            if (err) {
                console.log('Boom ca a peté 💥 !');
                return;
            }

            console.log(nbrBytes);
            console.log(buffer);
            console.log(buffer.toString());
        })

    } )

}

const readFile = (fileName) => {

    const fileDir = path.resolve('./', 'files', fileName)

    fs.readFile(fileDir, (err, data) => {
        if (err) {
            console.log('Boom ca a peté 💥 !');
            return;
        } 
        console.log(data.toString());
    } )
}

const readFilePromise = async (fileName) => {

    const fileDir = path.resolve('./', 'files', fileName)

    const data = await fspromise.readFile(fileDir)

    console.log(data.toString());
}


module.exports = readFilePromise