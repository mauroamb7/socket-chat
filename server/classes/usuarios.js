class Usuarios {

    constructor() {
        this.personas = []

    }

    //Agrego persona al chat
    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;
    }

    //Obtengo una persona
    getPersona(id) {

        //Filter regresa un nuevo arreglo, y el [0] se coloca para regresar solo la primera posicion (un unico registro)
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

    }

    //Obtengo todas las personas
    getPersonas() {
        return this.personas;
    }

    //Retorna todas las personas de una sala en particular
    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala)

        return personasEnSala
    }

    //Elimina persona del arreglo (por si se desconecta, abandona el chat, etc)
    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        //Reemplazo el arreglo actual de las personas que tenga
        this.personas = this.personas.filter(persona => persona.id != id)

        return personaBorrada;

    }

}

module.exports = {
    Usuarios
}