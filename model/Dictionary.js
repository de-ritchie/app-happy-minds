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
        return con.collection(this.collection).findOne({ _id: word.toLowerCase()})
    }

    insertWords(con, data){
        return con.collection(this.collection).insertMany(data, {
            ordered: false 
        });
    }
}

module.exports = Dictionary;