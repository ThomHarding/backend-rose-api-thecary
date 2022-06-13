const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT c.id, first_name, last_name, COALESCE(json_agg(to_jsonb(q)) FILTER (WHERE q.id IS NOT NULL), \'[]\') as quotes FROM characters c LEFT JOIN quotes q ON c.id = q.character_id GROUP BY c.id;');
    return rows.map((row) => new Character(row));
    // implement getAll() method to return all characters with a list of quotes
  }
}

module.exports = Character;
