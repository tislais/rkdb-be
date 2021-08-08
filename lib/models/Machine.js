import machines from '../controllers/machines.js';
import pool from '../utils/pool.js';

export default class Machine {
  id;
  name;
  manufacturer;
  image;
  date;
  type

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.manufacturer = row.manufacturer;
    this.image = row.image;
    this.date = row.date;
    this.type = row.type;
  }

  static async insert({ name, manufacturer, image, date, type }) {
    const { rows } = await pool.query(`
      INSERT INTO machines (name, manufacturer, image, date, type) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING * 
      `, [name, manufacturer, image, date, type]
    );

    return new Machine(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM machines
      `);

    return rows.map(row => new Machine(row));
  }
}