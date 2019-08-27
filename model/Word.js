class Word{
    
    constructor(name){
        this._id = name.toLowerCase();
        this.name = name;
        this.definitions = [];
    }
    addDefinition(definition){
        this.definitions.push(definition);
    }
}

module.exports = Word;