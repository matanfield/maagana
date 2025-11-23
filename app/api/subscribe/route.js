import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;

// Initialize pool
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

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
    // Enable UUID extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    dbInitialized = true;
    console.log('Database initialized: people table created with UUID');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    // Initialize database
    await initializeDatabase();

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Insert email into people table
    const result = await pool.query(
      'INSERT INTO people (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Email already registered' });
    }

    return NextResponse.json(
      { message: 'Email registered successfully', data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error inserting email:', error);
    return NextResponse.json(
      { error: 'Failed to register email' },
      { status: 500 }
    );
  }
}

