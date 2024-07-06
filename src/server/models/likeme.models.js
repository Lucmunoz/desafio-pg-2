import db from '../database/db_connect.js'

export const findAll = async () => {
  return await db('SELECT * FROM posts ORDER BY titulo ASC;')
}

export const findById = async (id) => {
  return await db('SELECT * FROM posts WHERE id=$1 ORDER BY titulo ASC;', [id])
}

export const create = async (titulo, img, descripcion) => {
  return await db('INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3 ,0) RETURNING *;', [titulo, img, descripcion])
}

export const updateLikesById = async (id) => {
  return await db('UPDATE posts SET likes= likes+1 WHERE id=$1 RETURNING *;', [id])
}

export const deleteById = async (id) => {
  return await db('DELETE FROM posts WHERE id = $1 RETURNING *;', [id])
}
