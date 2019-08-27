const fs = require('fs');
const path = require('path');

const cleanUp = (file) => {
    if(file && file.destination){
        fs.unlink(path.join(__dirname, '..', 'uploads', file.filename), (err, res) => {
            console.log('Error', err);
            console.log('res', res);
        })
        console.log(path.join(__dirname, '..', 'uploads', file.filename));
    }
}

module.exports = {
    cleanUp: cleanUp
}