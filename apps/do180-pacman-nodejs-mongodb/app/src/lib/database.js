'use strict';

const { MongoClient } = require('mongodb');
const config = require('./config');

// Configuración optimizada para OpenShift
const connectionOptions = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 50,
  retryWrites: true,
  retryReads: true,
  heartbeatFrequencyMS: 10000
};

let client;
let dbInstance;

async function initializeDb() {
  try {
    client = new MongoClient(config.database.url, connectionOptions);
    await client.connect();
    dbInstance = client.db();
    console.log('✅ MongoDB conectado (v4.13) - Protocolo OP_MSG');
    return dbInstance;
  } catch (err) {
    console.error('❌ Error de conexión:', err);
    throw err;
  }
}

module.exports = {
  connect: async (app) => {
    try {
      const db = await initializeDb();
      app.locals.db = db;
      return db;
    } catch (err) {
      console.error('Error en conexión:', err);
      process.exit(1); // Falla rápida en producción
    }
  },

  getDb: () => {
    if (!dbInstance) {
      throw new Error('Conexión no inicializada');
    }
    return dbInstance;
  },

  close: async () => {
    if (client) {
      await client.close();
    }
  }
};
