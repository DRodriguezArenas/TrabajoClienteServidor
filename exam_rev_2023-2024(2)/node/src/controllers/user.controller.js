const MongoDBUser = require('../models/user.model.mongodb');
const RedisUser = require('../models/user.model.redis');
const MysqlUser = require('../models/user.model.mysql');

const auth = require('../services/auth.service.js');

// Crear instancia de modelo dependiendo de la base de datos
const dbType = process.env.DB_TYPE || 'mysql';
let userModel;
console.log(dbType);
switch (dbType) {
  case 'mysql':
    userModel = new MysqlUser();
    break;
  case 'mongodb':
    userModel = new MongoDBUser();
    break;
  case 'redis':
    userModel = new RedisUser();
    break;
  default:
    userModel = new RedisUser();
}


// Create a new user
exports.create = (req, res) => {
  const user = req.body;
  // check if any value is missing
  if (!user.name || !user.email || !user.password) {
    return res.status(400).send({
      message: "Content can not be empty"
    });
  }
  console.log("Usuario a crear", user);
  //Check if exists
  userModel.getUserByEmail(user.email, (err, result) => {
    if(err) return res.status(500).send(err);
    if (result) return res.status(400).send({
      message: "User already exists"
    });
//     console.log(result);
    userModel.create(user, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({user, token: auth.signToken(user)});
    });
  });
};

exports.login = (req, res) => {
  const user = req.body;
  // check if any value is missing
  if (!user.email || !user.password) {
    return res.status(400).send({
      message: "Content can not be empty"
    });
  }
  userModel.getUserByEmail(user.email, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send("User not found");
    if (result.password != user.password) return res.status(401).send("Invalid password");
    delete result.password;
    res.status(200).send({user: result, token: auth.signToken(result)});
  });
}
  

// Edit an existing user
exports.update = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const updates = req.body;
  console.log(updates);
  userModel.update(userId, updates, (err, result) => {
    if (err) {return res.status(500).send(err)}
    res.status(200).send("Has been updated correctly");
  }); 
};

// Retrieve all users
exports.findAll = (req, res) => {
  userModel.getAll((err, result) => {
    if (err) return res.status(500).send(err);
    let users = {};
    for (let id in result) {
      let user = (result[id]);
      users[user.id] = user;
    }
    res.status(200).send(users);
  });
}

// Retrieve a single user
exports.findOne = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  userModel.get(userId, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send("User not found");
    res.status(200).send(result);
  });
};

// Delete a user
exports.delete = (req, res) => {
  const userId = req.params.id;
  userModel.delete(userId, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({
      message: "User deleted successfully"
    });
  });
};

exports.agregarFavorito = async (req, res) => {
  const user = req.body;

  try {
    const result = await userModel.agregarFavorito(user.userId, user.personajeId);
    if (result === null) {
      res.status(404).send('Usuario no encontrado o personaje ya en favoritos');
    } else {
      res.status(200).send('Personaje agregado a favoritos correctamente');
    }
  } catch (error) {
    console.error('Error al agregar personaje a favoritos:', error);
    res.status(500).send('Error interno del servidor al agregar personaje a favoritos');
  }
};

exports.eliminarFavorito = async (req, res) => {
  const user = req.body;

  try {
      await userModel.eliminarFavorito(user.userId, user.personajeId);
      res.status(200).send('Personaje eliminado de favoritos correctamente');
  } catch (error) {
      console.error('Error al eliminar personaje de favoritos:', error);
      res.status(500).send('Error interno del servidor al eliminar personaje de favoritos');
  }
};


exports.getFavoritos = async (req, res) => {
  try {
    const userId = req.params.id; 
    const favoritos = await userModel.getFavoritos(userId);
    console.log(favoritos);
    res.status(200).json(favoritos); 
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    res.status(500).send('Error interno del servidor al obtener los favoritos');
  }
};

exports.getChat = async (req, res) => {
  try {
    const chat = await userModel.getChat();
    res.status(200).json(chat);
  } catch (error) {
    console.error('Error al obtener el chat:', error);
    res.status(500).send('Error interno del servidor al obtener el chat');
  }
};

exports.saveMessage = async (req, res) => {
  try {
    const chat = req.body;
    const userId = chat.userId;
    const result = await userModel.saveMessage(chat);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al crear el chat:', error);
    res.status(500).send('Error interno del servidor al crear el chat');
  }
};