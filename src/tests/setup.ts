import { config } from 'dotenv';
import * as path from 'path';

// Lee el archivo .env
const envPath = path.resolve(process.cwd(), '.env');
const result = config({ path: envPath });

// Si se parseó correctamente, asigna las variables manualmente
// a process.env para asegurar que estén disponibles en el entorno de test.
if (result.parsed) {
  for (const key in result.parsed) {
    process.env[key] = result.parsed[key];
  }
}
