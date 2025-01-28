const swaggerUi = require('swagger-ui-express');

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'API Observaciones',
        version: '1.0.0',
        description: 'Documentación de la API para la gestión de observaciones astronómicas',
    },
    tags: [
        { name: 'Autenticacion', description: 'Endpoints para autenticación y registro de usuarios' },
        { name: 'Usuarios', description: 'Gestión de usuarios en el sistema' },
        { name: 'Objetos Celestes', description: 'Gestión de objetos astronómicos' },
        { name: 'Observaciones', description: 'Gestión de observaciones astronómicas' },
        { name: 'Fotografias', description: 'Gestión de fotografías asociadas a observaciones' },
        { name: 'Favoritos', description: 'Gestión de fotografías favoritas de usuarios' },
        { name: 'Validaciones', description: 'Gestión de validaciones realizadas por usuarios validadores' },
    ],
    paths: {
        '/auth/login': {
            post: {
                summary: 'Iniciar sesión',
                tags: ['Autenticacion'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', example: 'juan.perez@example.com' },
                                    password: { type: 'string', example: 'password123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Inicio de sesión exitoso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: 'Contraseña incorrecta' },
                    404: { description: 'Usuario no encontrado' },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
        },
        '/auth/register': {
            post: {
                summary: 'Registrar un nuevo usuario',
                tags: ['Autenticacion'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    first_name: { type: 'string', example: 'John' },
                                    last_name: { type: 'string', example: 'Doe' },
                                    email: { type: 'string', example: 'john.doe@example.com' },
                                    password: { type: 'string', example: 'password123' },
                                    rol: { type: 'string', example: 'principiante' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Usuario creado exitosamente',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer', example: 1 },
                                        message: { type: 'string', example: 'Usuario creado exitosamente' },
                                    },
                                },
                            },
                        },
                    },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
        },
        '/usuarios': {
    get: {
        summary: 'Obtener todos los usuarios',
        tags: ['Usuarios'],
        responses: {
            200: {
                description: 'Lista de usuarios',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id_user: { type: 'integer' },
                                    first_name: { type: 'string' },
                                    last_name: { type: 'string' },
                                    email: { type: 'string' },
                                    rol: { type: 'string', enum: ['principiante', 'avanzado', 'validador'] },
                                    points: { type: 'integer' },
                                    registration_date: { type: 'string', format: 'date' },
                                },
                            },
                        },
                    },
                },
            },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    post: {
        summary: 'Crear un nuevo usuario',
        tags: ['Usuarios'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            first_name: { type: 'string' },
                            last_name: { type: 'string' },
                            email: { type: 'string' },
                            password: { type: 'string' },
                            rol: { type: 'string', enum: ['principiante', 'avanzado', 'validador'] },
                        },
                    },
                },
            },
        },
        responses: {
            201: { description: 'Usuario creado exitosamente' },
            400: { description: 'Error en los datos de entrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},
        '/profile_data': {
    get: {
        summary: 'Obtener datos del perfil del usuario autenticado',
        tags: ['Usuarios'],
        security: [
            {
                BearerAuth: [],
            },
        ],
        responses: {
            200: {
                description: 'Datos del perfil obtenidos exitosamente',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id_user: { type: 'integer', example: 1 },
                                first_name: { type: 'string', example: 'Juan' },
                                last_name: { type: 'string', example: 'Pérez' },
                                email: { type: 'string', example: 'juan.perez@example.com' },
                                rol: { type: 'string', example: 'avanzado' },
                                points: { type: 'integer', example: 100 },
                                registration_date: { type: 'string', format: 'date', example: '2023-01-15' },
                            },
                        },
                    },
                },
            },
            401: { description: 'Usuario no autenticado o token inválido' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    patch: {
        summary: 'Actualizar datos del perfil del usuario autenticado',
        tags: ['Usuarios'],
        security: [
            {
                BearerAuth: [],
            },
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            first_name: { type: 'string', example: 'Juan' },
                            last_name: { type: 'string', example: 'Pérez' },
                            email: { type: 'string', example: 'juan.perez@example.com' },
                            password: { type: 'string', example: 'nueva_password123' },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Perfil actualizado exitosamente',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Perfil actualizado exitosamente' },
                            },
                        },
                    },
                },
            },
            400: { description: 'Error en los datos de entrada' },
            401: { description: 'Usuario no autenticado o token inválido' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},

        '/usuarios/{id_user}': {
            get: {
                summary: 'Obtener un usuario por ID',
                tags: ['Usuarios'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id_user',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID único del usuario',
                    },
                ],
                responses: {
                    200: {
                        description: 'Detalles del usuario',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id_user: { type: 'integer' },
                                        first_name: { type: 'string' },
                                        last_name: { type: 'string' },
                                        email: { type: 'string' },
                                        rol: { type: 'string', enum: ['principiante', 'avanzado', 'validador'] },
                                        points: { type: 'integer' },
                                        registration_date: { type: 'string', format: 'date' },
                                    },
                                },
                            },
                        },
                    },
                    404: { description: 'Usuario no encontrado' },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
            put: {
                summary: 'Actualizar datos de un usuario por ID',
                tags: ['Usuarios'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID del usuario',
                    },
                ],
                responses: {
                    200: {
                        description: 'Usuario actualizado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        first_name: { type: 'string' },
                                        last_name: { type: 'string' },
                                        email: { type: 'string' },
                                        password: { type: 'string'},
                                        rol: { type: 'string'},
                                        points: { type: 'integer' }
                                    },
                                },
                            },
                        },
                    },
                    404: { description: 'Usuario no encontrado' },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
            delete: {
                summary: 'Eliminar un usuario por ID',
                tags: ['Usuarios'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id_user',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID único del usuario',
                    },
                ],
                responses: {
                    200: { description: 'Usuario eliminado exitosamente' },
                    404: { description: 'Usuario no encontrado' },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
        },

'/objetos': {
    get: {
        summary: 'Obtener todos los objetos',
        tags: ['Objetos Celestes'],
        responses: {
            200: {
                description: 'Lista de objetos',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id_objeto: { type: 'integer', description: 'ID del objeto' },
                                    name: { type: 'string', description: 'Nombre del objeto' },
                                    type: { type: 'string', description: 'Tipo de objeto' },
                                    description: { type: 'string', description: 'Descripción del objeto' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    post: {
        summary: 'Crear un nuevo objeto',
        tags: ['Objetos Celestes'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', description: 'Nombre del objeto' },
                            type: { type: 'string', description: 'Tipo del objeto' },
                            description: { type: 'string', description: 'Descripción del objeto' },
                        },
                    },
                },
            },
        },
        responses: {
            201: { description: 'Objeto creado exitosamente' },
            500: { description: 'Error del servidor' },
        },
    },
},
'/objetos/{id}': {
    get: {
        summary: 'Obtener un objeto por ID',
        tags: ['Objetos Celestes'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'ID del objeto',
            },
        ],
        responses: {
            200: { description: 'Objeto encontrado' },
            404: { description: 'Objeto no encontrado' },
            500: { description: 'Error del servidor' },
        },
    },
    put: {
        summary: 'Actualizar un objeto por ID',
        tags: ['Objetos Celestes'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'ID del objeto',
            },
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', description: 'Nombre del objeto' },
                            type: { type: 'string', description: 'Tipo del objeto' },
                            description: { type: 'string', description: 'Descripción del objeto' },
                        },
                    },
                },
            },
        },
        responses: {
            200: { description: 'Objeto actualizado exitosamente' },
            404: { description: 'Objeto no encontrado' },
            500: { description: 'Error del servidor' },
        },
    },
    delete: {
        summary: 'Eliminar un objeto por ID',
        tags: ['Objetos Celestes'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'ID del objeto',
            },
        ],
        responses: {
            200: { description: 'Objeto eliminado exitosamente' },
            404: { description: 'Objeto no encontrado' },
            500: { description: 'Error del servidor' },
        },
    },
},

'/observaciones': {
    get: {
        summary: 'Obtener todas las observaciones',
        tags: ['Observaciones'],
        responses: {
            200: {
                description: 'Lista de observaciones',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id_observacion: { type: 'integer' },
                                    titulo: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    fecha: { type: 'string', format: 'date' },
                                    id_user: { type: 'integer' },
                                    id_object: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
            },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    post: {
        summary: 'Crear una nueva observación',
        tags: ['Observaciones'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            titulo: { type: 'string' },
                            descripcion: { type: 'string' },
                            fecha: { type: 'string', format: 'date' },
                            id_user: { type: 'integer' },
                            id_object: { type: 'integer' },
                        },
                    },
                },
            },
        },
        responses: {
            201: { description: 'Observación creada exitosamente' },
            400: { description: 'Error en los datos de entrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},
'/observaciones/{id_observacion}': {
    get: {
        summary: 'Obtener una observación por ID',
        tags: ['Observaciones'],
        parameters: [
            {
                in: 'path',
                name: 'id_observacion',
                required: true,
                schema: { type: 'integer' },
                description: 'ID único de la observación',
            },
        ],
        responses: {
            200: {
                description: 'Detalles de la observación',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id_observacion: { type: 'integer' },
                                titulo: { type: 'string' },
                                descripcion: { type: 'string' },
                                fecha: { type: 'string', format: 'date' },
                                id_user: { type: 'integer' },
                                id_object: { type: 'integer' },
                            },
                        },
                    },
                },
            },
            404: { description: 'Observación no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    put: {
        summary: 'Actualizar una observación por ID',
        tags: ['Observaciones'],
        parameters: [
            {
                in: 'path',
                name: 'id_observacion',
                required: true,
                schema: { type: 'integer' },
                description: 'ID único de la observación',
            },
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            titulo: { type: 'string' },
                            descripcion: { type: 'string' },
                            fecha: { type: 'string', format: 'date' },
                            id_user: { type: 'integer' },
                            id_object: { type: 'integer' },
                        },
                    },
                },
            },
        },
        responses: {
            200: { description: 'Observación actualizada exitosamente' },
            404: { description: 'Observación no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    delete: {
        summary: 'Eliminar una observación por ID',
        tags: ['Observaciones'],
        parameters: [
            {
                in: 'path',
                name: 'id_observacion',
                required: true,
                schema: { type: 'integer' },
                description: 'ID único de la observación',
            },
        ],
        responses: {
            200: { description: 'Observación eliminada exitosamente' },
            404: { description: 'Observación no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},

'/observaciones/{id_user}': {
    get: {
        summary: 'Obtener una observación por ID de Usuario',
        tags: ['Observaciones'],
        parameters: [
            {
                in: 'path',
                name: 'id_user',
                required: true,
                schema: { type: 'integer' },
                description: 'ID único del usuario',
            },
        ],
        responses: {
            200: {
                description: 'Detalles de la observación',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id_observacion: { type: 'integer' },
                                titulo: { type: 'string' },
                                descripcion: { type: 'string' },
                                fecha: { type: 'string', format: 'date' },
                                id_user: { type: 'integer' },
                                id_object: { type: 'integer' },
                            },
                        },
                    },
                },
            },
            404: { description: 'Observación no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},

'/fotografias': {
    get: {
        summary: 'Obtener todas las fotografías',
        tags: ['Fotografias'],
        responses: {
            200: {
                description: 'Lista de todas las fotografías',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    ID_img: { type: 'integer' },
                                    img_path: { type: 'string' },
                                    exposure_time: { type: 'string' },
                                    ISO: { type: 'integer' },
                                    applied_processing: { type: 'string' },
                                    state: { type: 'string' },
                                    ID_observation: { type: 'integer' },
                                    id_validation: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    post: {
        summary: 'Crear una nueva fotografía',
        tags: ['Fotografias'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            img_path: { type: 'string' },
                            exposure_time: { type: 'string' },
                            ISO: { type: 'integer' },
                            applied_processing: { type: 'string' },
                            state: { type: 'string' },
                            ID_observation: { type: 'integer' },
                            id_validation: { type: 'integer' },
                        },
                    },
                },
            },
        },
        responses: {
            201: { description: 'Fotografía creada exitosamente' },
            400: { description: 'Faltan campos requeridos' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},
'/fotografias/{id}': {
    get: {
        summary: 'Obtener una fotografía por ID',
        tags: ['Fotografias'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'ID de la fotografía',
            },
        ],
        responses: {
            200: { description: 'Detalles de la fotografía' },
            404: { description: 'Fotografía no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    put: {
        summary: 'Actualizar una fotografía por ID',
        tags: ['Fotografias'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'ID de la fotografía',
            },
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            img_path: { type: 'string' },
                            exposure_time: { type: 'string' },
                            ISO: { type: 'integer' },
                            applied_processing: { type: 'string' },
                            state: { type: 'string' },
                            ID_observation: { type: 'integer' },
                            id_validation: { type: 'integer' },
                        },
                    },
                },
            },
        },
        responses: {
            200: { description: 'Fotografía actualizada exitosamente' },
            400: { description: 'Faltan campos requeridos' },
            404: { description: 'Fotografía no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    delete: {
        summary: 'Eliminar una fotografía por ID',
        tags: ['Fotografias'],
        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'integer' },
                description: 'ID de la fotografía',
            },
        ],
        responses: {
            200: { description: 'Fotografía eliminada exitosamente' },
            404: { description: 'Fotografía no encontrada' },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},

'/favoritos': {
    post: {
        summary: 'Marcar una fotografía como favorita',
        tags: ['Favoritos'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id_user: { type: 'integer', description: 'ID del usuario que marca la fotografía como favorita' },
                            id_object: { type: 'integer', description: 'ID de la fotografía a marcar como favorita' },
                        },
                        required: ['id_user', 'id_object'],
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Fotografía marcada como favorita',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Fotografía marcada como favorita' },
                            },
                        },
                    },
                },
            },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
    delete: {
        summary: 'Quitar una fotografía de favoritos',
        tags: ['Favoritos'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id_user: { type: 'integer', description: 'ID del usuario que elimina la fotografía de favoritos' },
                            id_object: { type: 'integer', description: 'ID de la fotografía a eliminar de favoritos' },
                        },
                        required: ['id_user', 'id_object'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Fotografía eliminada de favoritos',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Fotografía eliminada de favoritos' },
                            },
                        },
                    },
                },
            },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},
'/favoritos/{id_user}': {
    get: {
        summary: 'Obtener las fotografías favoritas de un usuario',
        tags: ['Favoritos'],
        parameters: [
            {
                in: 'path',
                name: 'id_user',
                schema: { type: 'integer' },
                required: true,
                description: 'ID del usuario para obtener sus favoritos',
            },
        ],
        responses: {
            200: {
                description: 'Lista de fotografías favoritas',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    ID_img: { type: 'integer', description: 'ID de la fotografía' },
                                    img_path: { type: 'string', description: 'Ruta de la imagen' },
                                    exposure_time: { type: 'string', description: 'Tiempo de exposición' },
                                    ISO: { type: 'integer', description: 'Valor ISO de la fotografía' },
                                    applied_processing: { type: 'string', description: 'Procesamiento aplicado' },
                                    state: { type: 'string', description: 'Estado de la fotografía' },
                                    ID_observation: { type: 'integer', description: 'ID de la observación asociada' },
                                    id_validation: { type: 'integer', description: 'ID de la validación asociada' },
                                },
                            },
                        },
                    },
                },
            },
            500: { description: 'Error al procesar la solicitud' },
        },
    },
},

        '/validaciones': {
            get: {
                summary: 'Obtener todas las validaciones',
                tags: ['Validaciones'],
                responses: {
                    200: { description: 'Lista de validaciones' },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
            post: {
                summary: 'Crear una nueva validación',
                tags: ['Validaciones'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    score: { type: 'integer' },
                                    comments: { type: 'string' },
                                    ID_validador: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Validación creada exitosamente' },
                    500: { description: 'Error al procesar la solicitud' },
                },
            },
        },
    },
};

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
