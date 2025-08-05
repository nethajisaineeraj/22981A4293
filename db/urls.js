import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename:'./urls.db',
  driver:sqlite3.Database
});

export const initDB=async () => {
  const db=await dbPromise;
  await db.exec(
    `CREATE TABLE IF NOT EXISTS urls (
      shortId TEXT PRIMARY KEY,
      originalUrl TEXT NOT NULL
    );`
    );
  return db;
};

export const saveUrl=async (shortId, originalUrl) => {
  const db=await dbPromise;
  await db.run(
    'INSERT INTO urls (shortId, originalUrl) VALUES (?, ?)',
    shortId,
    originalUrl
  );
};

export const getUrl=async (shortId) => {
  const db=await dbPromise;
  const row=await db.get('SELECT originalUrl FROM urls WHERE shortId = ?', shortId);
  return row ? row.originalUrl : null;
};
