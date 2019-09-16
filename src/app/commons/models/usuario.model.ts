export class Usuario {
  public id = 0;
  public nombre = '';
  public email = '';
  public activo = true;
  public rol = '';

  constructor(fields?: {
    id?: number;
    nombre?: String;
    email?: String;
    activo?: boolean;
    rol?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
