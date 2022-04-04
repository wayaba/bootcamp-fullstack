Ejercicios clase 6 y 7 de bootcamp

Basado en video
https://www.youtube.com/watch?v=o85OkeVtm7k&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=6&ab_channel=midudev
y
https://www.youtube.com/watch?v=ep_plUeKV1Y&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=7&ab_channel=midudev

Extensiones a instalar en VCode:

- ESlint
- REST Client
- Error Lens
- Prettier

{
"prettier.semi": false,
"prettier.singleQuote": true,
"prettier.jsxSingleQuote": true,
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
},
}

# el .env

Siempre con el puerto

```
PORT=3001
```

Para conectar al cloud de mongo

```
MONGO_DB_URI=mongodb+srv://wayaba:wayaba123@cluster0.0zbxt.mongodb.net/note-db
MONGO_DB_URI_TEST=mongodb+srv://wayaba:wayaba123@cluster0.0zbxt.mongodb.net/note-test-db
```

Para conectar al mongo dockerizado

```
MONGO_DB_URI=mongodb://wayaba:wayaba123@localhost:27017/note-db
MONGO_DB_URI_TEST=mongodb://wayaba:wayaba123@localhost:27017/note-test-db
```
