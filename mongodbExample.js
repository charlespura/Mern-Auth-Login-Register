// Minimal MongoDB Atlas example (Node.js)
// Install: npm install mongodb
// Run: node mongodbExample.js
// This script shows a full connect -> write -> read -> close flow in one place.

const fs = require('fs');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

// Read MONGODB_URI from env, or fallback to a small local config file.
function getMongoUri() {
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) {
    return process.env.MONGODB_URI.trim();
  }

  const configPath = path.join(__dirname, 'mongodbExample.config.json');
  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, 'utf8');
    const cfg = JSON.parse(raw);
    if (cfg.MONGODB_URI && String(cfg.MONGODB_URI).trim()) {
      return String(cfg.MONGODB_URI).trim();
    }
  }

  throw new Error(
    'Missing MONGODB_URI. Set it in your environment or in mongodbExample.config.json.'
  );
}

async function main() {
  console.log('1) Loading MongoDB connection string...');
  const uri = getMongoUri();

  // Use a single client instance for the entire script.
  const client = new MongoClient(uri);

  try {
    console.log('2) Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('   Connected.');

    const dbName = 'authDB';
    const collectionName = 'users';
    const db = client.db(dbName);
    const users = db.collection(collectionName);

    console.log('3) Preparing 10 sample user profile documents...');
    const now = Date.now();
    const docs = [
      { name: 'Ava Santos', email: 'ava.santos@example.com', role: 'admin' },
      { name: 'Liam Cruz', email: 'liam.cruz@example.com', role: 'user' },
      { name: 'Noah Reyes', email: 'noah.reyes@example.com', role: 'user' },
      { name: 'Mia Delgado', email: 'mia.delgado@example.com', role: 'user' },
      { name: 'Ethan Ramos', email: 'ethan.ramos@example.com', role: 'manager' },
      { name: 'Sophia Lee', email: 'sophia.lee@example.com', role: 'user' },
      { name: 'Lucas Tan', email: 'lucas.tan@example.com', role: 'user' },
      { name: 'Isabella Lim', email: 'isabella.lim@example.com', role: 'support' },
      { name: 'Elijah Ong', email: 'elijah.ong@example.com', role: 'user' },
      { name: 'Harper Go', email: 'harper.go@example.com', role: 'user' }
    ].map((u, i) => ({
      ...u,
      // Spread timestamps so sorting by createdAt is meaningful.
      createdAt: new Date(now - i * 60 * 60 * 1000)
    }));

    console.log('4) Inserting documents...');
    const insertResult = await users.insertMany(docs);
    console.log(`   Inserted ${insertResult.insertedCount} documents.`);

    console.log('5) Reading 5 most recent users by createdAt...');
    const recentUsers = await users
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    console.log(recentUsers);

    console.log('6) Reading one user by _id...');
    const firstId = insertResult.insertedIds['0'];
    const oneUser = await users.findOne({ _id: new ObjectId(firstId) });
    console.log(oneUser);

    console.log('7) Done. Closing connection...');
  } catch (err) {
    console.error('Error during MongoDB example:', err.message);
  } finally {
    await client.close();
  }
}

main();
