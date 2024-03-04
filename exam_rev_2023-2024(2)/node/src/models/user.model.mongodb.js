const User = require('./user.model');
const mongoClient = require('../services/mongodb.service');
const mongodb = require('mongodb');
// const { use } = require('../routes/user.route');

class MongoDBUser extends User {
  constructor(database) {
    super(database);
    this.collection = mongoClient.db("linkShortener").collection('users');
    this.collectionChat = mongoClient.db("linkShortener").collection('chat');
  }

  async create(user, cb) {
    const result = await this.collection.insertOne(user);
    cb(null, result);
    return result.insertedId.toString();
  }

  async get(id, cb) {
    // var mongo = require('mongodb');
    const result = await this.collection.findOne({'_id': new mongodb.ObjectId(""+id)});
    cb(null, result);
    return result;
  }

  async getAll(cb) {
    const result = await this.collection.find().toArray();
    cb(result);
    return result;
  }

  async getUserByEmail(email, cb) {
    const result = await this.collection.findOne({ email: email });
    cb(null, result);
    return result;
  }

  async getIdByEmail(email) {
    const result = await this.collection.findOne({ email: email }, { projection: { _id: 1 } });
    return result && result._id.toString();
  }

  async update(id, updates, cb) {
    const result = await this.collection.updateOne({'_id': new mongodb.ObjectId(""+id)}, {$set: updates});
    cb(null, result);
    return result.modifiedCount > 0;
  }

  async delete(id, cb) {
    const result = await this.collection.deleteOne({'_id': new mongodb.ObjectId(""+id)});
    cb(null, result);
    return result.deletedCount > 0;
  }

  async agregarFavorito(id, personajeId) {
    try {
      const user = await this.collection.findOne({ _id: new mongodb.ObjectId(""+id) });
      
      if (!user) {
        return null;
      }

      if(user.personajes.includes(personajeId)){
        return null;
      }
      user.personajes.push(personajeId);
  
      await this.collection.updateOne(
        { _id: new mongodb.ObjectId(""+id) },
        { $set: { personajes: user.personajes } }
      );
      return user.personajes;
    } catch (error) {
      return null;
    }
  }

  async eliminarFavorito(id, personajeId) {
    try {
      const user = await this.collection.findOne({ _id: new mongodb.ObjectId(""+id) });
  
      if (!user) {
        return null;
      }
  
      if (!user.personajes || !user.personajes.includes(personajeId)) {
        return null;
      }
  
      console.log(user.personajes, "antes");
      user.personajes = user.personajes.filter(p_id => p_id !== personajeId);
      
      console.log(user.personajes, "despues");

      await this.collection.updateOne(
        { _id: new mongodb.ObjectId(""+id) },
        { $set: { personajes: user.personajes } }
      );
  
      return user.personajes;
    } catch (error) {
      return null;
    }
  }

  async getFavoritos(id) {
    try {
      const user = await this.collection.findOne({ _id: new mongodb.ObjectId(""+id) });
  
      if (!user) {
        return null;
      }
  
      return user.personajes;
    } catch (error) {
      return null;
    }
  }

  async saveMessage(chat) {
    const result = await this.collectionChat.insertOne(chat);
    return result;
  }

  async getChat() {
    const result = await this.collectionChat.find().toArray();
    return result;
  }
  
}

module.exports = MongoDBUser;
