const config = require('../config');
const mongo = require('./mongoClient');

class Dictionary{

    constructor(){
        this.collection = 'dictionary';
    }

    connect(){
        return mongo.connectDB(config.MONGODB_DB);
    }

    search(con, word){
        return con.collection(this.collection).findOne({ _id: word.toLowerCase()}, {
            fields: {
                _id: 0,
                name: 1,
                definitions: 1
            }
        })
    }

    insertWords(con, data){
        return con.collection(this.collection).insertMany(data, {
            ordered: false 
        });
    }
}

module.exports = Dictionary;