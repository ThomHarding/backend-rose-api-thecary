const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT e.id, title, season, number, COALESCE(json_agg(to_jsonb(q)) FILTER (WHERE q.id IS NOT NULL), \'[]\') as quotes FROM episodes e LEFT JOIN quotes q ON e.id = q.episode_id GROUP BY e.id;');
    return rows.map((row) => new Episode(row));
    // implement getAll() method to return a list of Episodes with quotes
  }
}

module.exports = { Episode };
