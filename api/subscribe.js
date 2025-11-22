import pg from 'pg';

const { Pool } = pg;

// Initialize pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database on first run
let dbInitialized = false;
async function initializeDatabase() {
  if (dbInitialized) return;
  
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    dbInitialized = true;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize database
    await initializeDatabase();

    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Insert email into people table
    const result = await pool.query(
      'INSERT INTO people (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'Email already registered' });
    }

    return res.status(201).json({ 
      message: 'Email registered successfully', 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Error inserting email:', error);
    return res.status(500).json({ error: 'Failed to register email' });
  }
}

