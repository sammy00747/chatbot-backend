const {MongoClient} = require('mongodb');

function main(){
    const client = new MongoClient('mongodb+srv://sumit_mridha:SEREnLFJu22DXURn@cluster0.uf3cu0l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    try {
        // Connect to the MongoDB cluster
        client.connect()
        .then(() => {
            console.log('connected to mongodb')
            db = client.db('getgpt_db');
        });
    } catch (e) {
        console.error(e);
    }
}

var getCollection = (collectionName) => {
    return db ? db.collection(collectionName) : null;
};

module.exports = {main,getCollection};