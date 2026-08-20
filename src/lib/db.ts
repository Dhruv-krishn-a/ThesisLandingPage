import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

export async function getClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  return client;
}

export async function getContentData() {
  try {
    const client = await getClient();
    try {
      const res = await client.query('SELECT data FROM site_content WHERE id = 1');
      if (res.rows.length > 0) {
        return res.rows[0].data;
      }
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Supabase fetch failed, falling back to local JSON:', error);
  }

  // Fallback to local JSON
  if (fs.existsSync(CONTENT_FILE_PATH)) {
    const fileContents = fs.readFileSync(CONTENT_FILE_PATH, 'utf8');
    return JSON.parse(fileContents);
  }
  
  return null;
}

export async function saveContentData(payload: any) {
  let dbSuccess = false;
  try {
    const client = await getClient();
    try {
      await client.query('UPDATE site_content SET data = $1 WHERE id = 1', [JSON.stringify(payload)]);
      dbSuccess = true;
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Supabase update failed:', error);
    // Don't throw if we want it to still save locally as fallback, 
    // but typically we want to know if DB failed. 
    // We'll proceed to save locally anyway to ensure data is not lost.
  }
  
  return dbSuccess;
}

