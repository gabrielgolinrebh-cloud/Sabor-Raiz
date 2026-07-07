import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const parentEnvPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath, override: true });
dotenv.config({ path: parentEnvPath, override: true });

const normalizeEnv = (value) => (value ? value.replace(/;$/, '').trim() : '');

const pool = mysql.createPool({
  host: normalizeEnv(process.env.DB_HOST),
  user: normalizeEnv(process.env.DB_USER),
  password: normalizeEnv(process.env.DB_PASSWORD),
  database: normalizeEnv(process.env.DB_NAME),
  port: Number(normalizeEnv(process.env.DB_PORT || '3306')) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;