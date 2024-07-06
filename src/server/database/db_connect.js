import pg from 'pg'
const { Pool } = pg

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const db = async (query, values) => {
  try {
    const result = await pool.query(query, values)
    // console.log(result.rows)
    return result.rows
  } catch (error) {
    // Visualizamos error en terminal - backend
    console.error('[db_connect]=>db:', error)
    // Generamos nuevo error para enviar a front
    const newError = new Error(`[db_connect]=>db: ${error.message}`)
    throw newError
  }
}

export default db
