const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utils')

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala)

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala)

        //Mando las personas conectadas solo de la sala correspondiente
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala());

        //retorno en el callback todas las personas conectadas en el chat
        callback(usuarios.getPersonasPorSala(data.sala));



    })

    //Envia mensajes al chat, a todos
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona.nombre, data.mensaje)

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    })

    //Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id)

        //Mandamos ID
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))

    })


});