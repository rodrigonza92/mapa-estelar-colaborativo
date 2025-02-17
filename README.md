### **Título: Mapa Estelar Colaborativo**

#### **Descripción**
Este proyecto es una plataforma web diseñada para crear un atlas celeste colaborativo que permita a astrónomos aficionados y profesionales compartir, registrar y validar observaciones astronómicas y fotografías de manera estructurada. El desarrollo del proyecto sigue la metodología ágil Scrum como parte del Simulacro para la asignatura de Programación 3. El objetivo es centralizar la información astronómica para facilitar su consulta y validación.

---

#### **Funcionalidades**
1. **Registro y Gestión de Usuarios**:
   - Registro de usuarios con roles (principiante y validador).
   - Perfil personal con historial de observaciones.

2. **Catálogo de Objetos Celestes**:
   - Listado de estrellas, planetas, galaxias, nebulosas y otros cuerpos celestes con información detallada:
     - Nombre oficial y alternativos.
     - Tipo de objeto, constelación y temporada de visibilidad.
     - Coordenadas celestes y magnitud aparente.

3. **Registro de Observaciones**:
   - Agregar observaciones con detalles como fecha, ubicación, condiciones del cielo, y equipo utilizado.
   - Subida de hasta 5 fotografías por observación, con datos técnicos (exposición, ISO, etc.).
   - Validación de observaciones por usuarios autorizados.

4. **Búsqueda Avanzada**:
   - Filtrado de objetos celestes por tipo, constelación, magnitud y temporada de visibilidad.

5. **Sistema de Puntos y Rankings**:
   - Acumulación de puntos por observaciones validadas.
   - Rankings mensuales y históricos de los observadores más activos.

6. **Gestión de Favoritos**:
   - Guardar objetos celestes en una lista personalizada para seguimiento.

7. **Validación de Observaciones**:
   - Aprobación o rechazo de observaciones y fotografías por usuarios validadores.
   - Solicitud de más información para observaciones incompletas.

---

#### **Metodología**
El proyecto se desarrolla utilizando **Scrum**, con dos sprints principales:
- **Sprint 1**: Finaliza el 17 de enero.
- **Sprint 2**: Finaliza el 31 de enero.

Cada sprint incluye reuniones de planificación, revisiones y retrospectivas. El backlog es actualizado tras cada revisión.

---

#### **Tecnologías Utilizadas**
- **Frontend**: ReactJS
- **Backend**: Node.js con API RESTful
- **Autenticación**: JSON Web Tokens (JWT)
- **Base de Datos**: MySQL
- **Despliegue**: Servidores en producción para frontend y backend
- **Control de Versiones**: GitHub Projects para la gestión del repositorio y tareas

---

#### **Instalación**
1. Clona el repositorio:
   ```bash
   git clone <https://github.com/users/rodrigonza92/projects/3/views/1>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd nombre-del-repositorio
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
   ```
   VITE_API_BASE_URL=<http://localhost:3000/api-docs/#/>
   ```

5. Inicia la aplicación:
   ```bash
   npm run dev
   ```

---

#### **Contribuciones**
Este proyecto fue desarrollado por:
- Gonza Rodrigo Eduarco
- Chumacero Rene Alfredo
- Karen Nilda Gutierrez
- Ramos, Eugenia Silvia

---

#### **Licencia**
El proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
