interface ClienteProps {
    id: number;
    alias: string;
    nombre: string;
    telefono: string;
    domicilio: string;
    correo: string;
}

class Cliente {
    id: number;
    alias: string;
    nombre: string;
    telefono: string;
    domicilio: string;
    correo: string;

    constructor({ id, alias, nombre, telefono, domicilio, correo }: ClienteProps) {
        this.id = id;
        this.alias = alias;
        this.nombre = nombre;
        this.telefono = telefono;
        this.domicilio = domicilio;
        this.correo = correo;
    }
}

export default Cliente;