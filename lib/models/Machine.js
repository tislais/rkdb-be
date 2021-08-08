import machines from '../controllers/machines.js';
import pool from '../utils/pool.js';

export default class Machine {
  id;
  name;
  manufacturer;
  image;
  date;
  type;
  serial;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.manufacturer = row.manufacturer;
    this.image = row.image;
    this.date = row.date;
    this.type = row.type;
    this.serial = row.serial;
  }

  static async insert({ name, manufacturer, image, date, type, serial }) {
    const { rows } = await pool.query(`
      INSERT INTO machines (name, manufacturer, image, date, type, serial) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING * 
      `, [name, manufacturer, image, date, type, serial]
    );

    return new Machine(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM machines
      `);

    return rows.map(row => new Machine(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM machines
      WHERE id = $1
      `, [id]
    );

    if (!rows[0]) return null;
    return new Machine(rows[0]);
  }

  static async update({ serial }, id) {
    const { rows } = await pool.query(`
      UPDATE machines
      SET serial = $1
      WHERE id = $2
      RETURNING *
      `, [serial, id]
    );    
    
    console.log(new Machine(rows[0]));

    if (!rows[0]) return null;
    return new Machine(rows[0]);
  }
}