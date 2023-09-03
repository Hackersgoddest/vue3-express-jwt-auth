require('dotenv').config();
// sync-database.js
const sequelize = require('./db');
const User = require('./schemas/User');

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Tables synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing tables:', error);
  } finally {
    // Close the database connection when synchronization is complete
    await sequelize.close();
  }
}

// Call the syncDatabase function to run the synchronization once
syncDatabase();
