const pool = require('../utils/pool');

class Quote {
  id;
  detail;
  character_id;
  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.character_id = row.character_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM quotes');
    return Number(rows[0].count);
  }

  static async insert() {
    const { rows } = await pool.query('INSERT INTO quotes(episode_id, character_id, detail) VALUES (6, 6,\'Okay, I have never heard someone say so many wrong things, one after the other, consecutively, in a row.\') RETURNING *;');
    // implement insert to add new quote
    return new Quote(rows[0]);
  }
}

module.exports = { Quote };
