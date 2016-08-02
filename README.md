- App que se va realizando durante el curso "Definitivo de Javascript".

= INSTALACIÓN =

- git clone https://github.com/aitiba/platzigram.git
- cd platzigram
- npm install
- Modificar el contenido del fichero *env.config.sh* y su nombre por *config.sh*.
- Ejecutar en consola *source env.sh*. Con *echo $AWS_ACCESS_KEY* se ve si se seteo correctamente.
- npm run build
- npm start (la app estara corriendo en el puerto 5050)

EL admin de rethinkdb esta en http://localhost:8080. Para ello la base de datos
tiene que esta activa. Los datos de rethinkdb se guardan en el mismo directorio donde se corre *rethinkdb* dentro de una carpeta llamada *rethinkdb_data*
