import crypto from "crypto";
import pgPool from "../config/db.js";
/*
shortened_urls Table Schema 
id UUID PRIMARY_KEY
url TEXT
*/

export const getAllShortenedUrls = async () => {
  const query = {
    name: "get-all-shortened-urls",
    text: "SELECT * FROM shortened_urls",
  };

  return await pgPool.query(query);
};

export const getShortenedUrl = async (urlId) => {
  const query = {
    name: "get-shortened-url",
    text: "SELECT * FROM shortened_urls WHERE id = $1",
    values: [urlId],
  };

  return await pgPool.query(query);
};

export const createShortenedUrl = async (fullUrl) => {
  const query = {
    name: "create-shortened-url",
    text: "INSERT INTO shortened_urls(id, url) VALUES($1, $2) RETURNING *",
    values: [crypto.randomUUID(), fullUrl],
  };

  return await pgPool.query(query);
};

export const deleteShortenedUrl = async (urlId) => {
  const query = {
    name: "delete-shortened-url",
    text: "DELETE FROM shortened_urls WHERE id = $1",
    values: [urlId],
  };

  return await pgPool.query(query);
};
