# Twitter.js

## Introducción

### Postman

Considerá instalar [Postman](https://www.getpostman.com/), una herramienta muy útil para hacer pedidos HTTP e inspeccionar los resultados de las respuestas HTTP. Esto no es estrictamente necesario pero va a darte mas opciones para debuggear y aprender.

### Contexto y Objetivos

Hemos visto como Node.js permite a JavaScript interactuar con la computadora. Express ayuda nuestra aplicación de Node responder pedidos HTTP. Apliquemos estas herramientas para crear algo orientado al consumidor: un simple clon de Twitter. Este proyecto nos va a sumergir en lo profundo de las características principales de Express, especialmente enrutamiento (routing) y plantillas(templating). 

#### Twitter.js

Vamos a construir:

- Un data store para contener nuestros tweets en el servidor. Esto no es una base de datos persistente; simplemente vamos a usar un arreglo de Javascript para mantener objetos en el RAM del servidor.
- Una homepage que se vea como Twitter que liste todos los tweets de todos los usuarios.
- Un formulario para publicar nuevos tweets
- Un página de perfil que muestre los tweets de un usuario específico.
Twitter.js

## Setup

### Inicializando el proyecto de Node

#### Directorio & Git

Haz un directorio `twitter-js` para nuestra app y `cd` en él.

Este es un buen momento para inicializar un repo con `git init`. Recuerda hacer `git add -A` y `git commit -m 'mi mensaje de commit'` en hitos exitosos.


#### package.json

Todos los proyectos de Node necesitan un `package.json`. Recuerda el rol que estos archivos tienen:

- Describe el proyecto
- Lista las dependencias
- Define scripts

**Usa `npm init`** para rápidamente generar un package.json.

```sh
npm init
name: (twitter-js)
version: (1.0.0)
description: Una aplicación cool de Twitter 
...
```

### Una estructura de archivos básico

Establezcamos una estructura de archivos simple, dibujando el directorio de `twitter-js` con un par de comandos shell.

```sh
mkdir public public/stylesheets routes views
touch app.js public/stylesheets/style.css routes/index.js
touch views/index.html views/layout.html
```

Tu directorio `twitter-js` ahora debería machear lo siguiente:

```
├── app.js
├── package.json
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   └── index.js
└── views
    ├── index.html
    └── layout.html
```

¿Cuál es el plan? `app.js` va a ser nuestra aplicación principal. Archivos estáticos (que no cambian) en `public` van a ser servidos automáticamente cuando sean requeridos, y archivos en `routes`y `views` van a permitirnos definir contenido dinámico.

### Instalando Express

En nuestra app, Express va a manejar entregar contenido desde el servidor al cliente -  eso es, manejar pedidos y respuestas a la página. Podemos instalarlo con un solo comando:

```sh
npm install express --save
```

Chequeá el `package.json` para confirmar que fue añadido como una dependencia.

### Gitignore

Los paquetes npm varían en sus tamaños y redundancias. Normalmente los *npm packages* (descargados como sub-carpetas de la carpeta `node_modules`) contienen cientos de archivos. Un argumento común es que dado que los paquetes npm pueden siempre ser re-descargados y no forman parte del código de tu aplicación, no deberían ser incluidos el control de fuente (Git) ya que seria un desperdicio de espacio. 

Para excluir ciertos archivos, [Git obedece al archivo .gitignore](https://git-scm.com/docs/gitignore) en el directorio de tu proyecto. Este archivo puede contener "glob patterns" que matchien varios archivos y carpetas. Haz `touch .gitignore` para generar este archivo, y excluye tus módulos node con esta simple linea:


```
node_modules
```

Con nuestra configuración inicial en pie, ahora sería un buen momento para agregar y commitear. Chequeá la [página de Github de ayuda sobre gitignore](https://help.github.com/articles/ignoring-files/) para un poco mas de detalles sobre este archivo bastante útil.

## Configurando Express

### Haciendo una instancia de la aplicación

Hemos instalado Express, pero no lo estamos usando todavía. En `app.js`, vas a necesitar requerir el modulo de Express, y guardar su `export` en una variable. Recuerda que cuando requieras un modulo que esta *built-in* (e.g. fs) o instalado (e.g. express), no vas a necesitar especificar un path, solo el nombre del modulo.  

Ahora que `express` esta disponible, ¿Qué puede hacer? Su mayor rol es crear una instancia de una aplicación. Hazlo, guardando la instancia en una variable `app`.

```js
const express = require( 'express' );
const app = express(); // crea una instancia de una aplicación de express
```

Esta entidad de app va a demostrar el verdadero poder de Express. `app` tiene muchos métodos disponibles para configurar nuestra aplicación y definir su comportamiento - eso es, como responde a requests.

> Podríamos llamar la instancia de `app` como `twitterapp` o similares, y lo haríamos si estaríamos definiendo múltiples aplicaciones simultaneas. Sin embargo, `app` es claro y convencional.

## Comenzando un Servidor

Al final de `app.js` , dile a tu `app` que escuche (*listen*) para requests en el puerto 3000 (en otras palabras, comenzar un servidor HTTP básico), y loguea el mensaje "Servidor escuchando en PORT 3000" una vez conectado. Trata corriendo tu archivo `app.js` con el comando de node en un terminal.

- La app corre sin un error?
- Ves tu mensaje de conexión?


#### Una simple ruta

Que pasa si visitas [http://localhost:3000](http://localhost:3000)? Vas a ver "Cannot GET /" en tu browser.

Tu servidor esta corriendo, pero no sabe aún que hacer con un pedido HTTP como `GET /`. Arreglemos esto con una simple ruta en `app.js`. Agregá un GET handler a tu app que responda un mensaje de bienvenida cuando el browser solicite el `/` (o "root") URI - que hacé cuando entramos a [http://localhost:3000/](http://localhost:3000) en nuestra barra de navegación


+++Un ejemplo útil
Chequeá el [ejemplo de Hello World de Express](http://expressjs.com/en/starter/hello-world.html).
+++ 

Detené `app.js` en tu ventana de la terminal con `CTRL+C`, y refrescalo con `node app`. Visita tu sitio otra vez; deberías ver un mensaje de bienvenida en tu browser. Si te fijas en tu network tab en dev tools, deberías ver un código de estado(status code) exitoso (200). Este puede ser un buen momento para hacer un Git commit, no lo crees?

#### Otras rutas?

¿Qué pasa cuando visitas otras rutas - digamos, [http://localhost:3000/news](http://localhost:3000/news)? Opcionalmente, examiná tu `app.js` actual y fijate si puedes hacer otra ruta simple que mande un mensaje diferente al cliente cuando visite `/news`. Vamos a estudiar routing con mayor detalle pronto. 


### Logging Middleware

Tu próxima tarea es crear un logging middleware que se va a disparar para cada pedido que entra. Logueá al menos cada verbo y ruta entrante. A la larga este tipo de utilidad nos va a ayudar a debuggear nuestra aplicación. Cuando hayas terminado deberías ser capaz de hacer pedidos a tu servidor y ver algo como esto en tu shell:

```sh
GET /
GET /is-anybody-in-there
POST /modernism
```

+++Registrando middleware al nivel de tu aplicación
Pon esto antes de todas tus otros `app.use`, `app.get`, etc.
```js
app.use(function (req, res, next) {
    // haz tu logueo aquí
    // llama a `next`, o sino tu app va a ser un agujero negro - recibiendo pedidos pero nunca respondiendo adecuadamente.
})
```

`app.use([[función aquí]])` registra una función para correr por cada pedido que entre.
+++

Si querés hacerlo un poco más picante, usa la librería `chalk` para colorear tu output como te parezca.

#### middleware chain

Con un logger funcionando para todos los requests, trata añadiendo un segundo logger que dispare solo para un request para un URI específico y todos los sub-URIs, por ejemplo todos los URI empezando con `/special/`. Este logger puede simplemente loguear un mensaje como "haz llegado a un área especial". Nota que en orden que el middleware universal y este nuevo middleware para un URI específico para funcionar, vas a tener que llamar `next` adecuadamente en al menos uno de ellos.

+++Registrando middleware para un URI específico
`app.use([algún path en string: '/special']], [[función aquí]])` registrá una función para correr en cada pedido entrante comenzando con `/special/`, incluyendo `/special/`, `/special/subpath`, etc.
+++

#### morgan

Existe una librería Node llamada `morgan` que hace esencialmente lo que acabamos de hacer. Morgan es un ejemplo de un application-level middleware. Pasarlo por `app.use()` hace que intercepte todos los requests. Por lo tanto, cada vez que un cliente se comunica con nuestro servidor, Morgan loguea un resumen. Morgan también loguea cuando tu servidor envía una respuesta, y información relacionada como `content-length` y `content-type`. Morgan es el estándar de la industria, construido por Express mismo.


### Coordinando y Dinamizando

#### nodemon

Luego de cambiar un archivo, tenemos que parar el servidor (`CTR+C`) y comenzarlo otra vez (`node app`). Claramente esto se volverá tedioso a medida que continuemos codeando! Por suerte, el [modulo `nodemon`](https://github.com/remy/nodemon) puede observar los archivos y reiniciar el servidor por nosotros.

**Instalá `nodemon` globalmente***. Provee una función dentro de la command-line; no hay razón de requerirlo en los archivos de nuestra app. Ambos compañeros de la pareja deberían hacer esto ya que es algo que no deberían hacer de nuevo.

Corre `nodemon app.js` para iniciar nuestra app, y luego haz cualquier edición a app.js. El servidor va a automáticamente reiniciar (chequeá la terminal). Debes refrescar tu servidor, pero estamos haciendo progreso.


#### Definiendo un start Script

Mientras `nodemon app.js` es bastante simplemente, en algunos paquetes el modulo principal puede no ser `app.js` pero otro archivo (e.g index.js). Es una práctica común definir un start script que maneje el inicio de la aplicación, por lo tanto el comando `npm start` funciona para cualquier proyecto.

Recuerda que uno de los roles del `package.json` era definir scripts. Agrega una propiedad `start` a `scripts` con el valor de `'nodemon app.js'`. Testealo en la terminal escribiendo npm start.

> Puedes imaginar que teniendo scripts diferentes puede ser útil. Por ejemplo, en tu servidor de producción podríamos preferir node a nodemon. Podemos usar scripts separados para serve vs. develop. Un test script correría nuestros specs, y así.


## Colaboración Git

### Resumen

Ojalá, estuviste commiteando a tu repo en buenos hitos. Vamos a tomarnos un descanso de codear nuestra app para configurar un poco de colaboración Git entre vos y tu compañero. Al final de esta sección, vas a tener:

- Configurado un repo remoto online (GitHub) referido como "origin"
- pusheado tu repo actual a GitHub
- Agregado a tu compañero como un colaborador
- En la computadora de tu compañero clonado el origin repo
- Instalado la app (descargando todas las dependencias)

De ahí en adelante, ambos van a ser capaces de pushear y pullear del repo, colaborando en el código y cambiando fácilmente entre maquinas.

### Haciendo un repo en GitHub

Visitá [https://github.com/new](https://github.com/new) y crea un repo llamado `twitter-js`.

**No elijas** 'initialize with a readme' - vas a necesitar este repo tenga cero historia. 

### Push your Repo

En la página que carga, vas a ver las instrucciones para pushear un repo existente en la terminal:

```sh
git remote add origin https://github.com/TUUSUARIO/twitter-js.git
git push -u origin master
```

Reemplazá TUUSUARIO con tu usuario de GitHub. Estos comandos hacen lo siguiente:

1. Agregar una direccion de un repo remoto twitter-js, referido en tu maquina como "origin"
2. Pushea tus commits actuales a la branch master en tu origin, y lo marca como la branch para seguir.

Visita la página de tu repo en GitHub y confirma que tu proyecto se subió correctamente. 

### Agregando Colaboradores

Tu compañero va a ser capaz de visitar tu página de GitHub y clonar tu repo. Sin embargo, no van a ser capaz de pushear a tu repo. Para esa capacidad, lo necesitas agregar como un colaborador.

Visita [https://github.com/TUUSUARIO/twitter-js/settings/collaboration](https://github.com/TUUSUARIO/twitter-js/settings/collaboration) (donde TUUSUARIO es tu username de GitHub). Busca a tu compañero en el campo provisto y agregalos en tu proyecto.

Felicitaciones, ahora ambos tienen acceso a pushear y pullear.


### Clonando el repo

Tu compañero debería clonar el repo desde la página de tu proyecto (deberías estar familiarizado con esto ya!). Si tu compañero hace un pequeño cambio (e.g., agrega un comentario) y lo commitea, debería ser capaz de pushear ese commit al branch `origin master`

```sh
git push origin master
```

Luego deberías ser capaz de hacer `git pull` en esos cambios a tu repo local. 

>ADVERTENCIA: En proyectos colaborativos de Git mas grandes, pushear y pullear al branch master es generalmente una mala idea como va a llevar usualmente a *merge conflicts* y otros problemas. En cambio, colaboradores hacen branches y submitean pull requests para incluirlos en el branch master. Esto va mas allá del alcance de este workshop, pero por ahora solo sabe para prevenir merge conflicts trabajen en una computadora a la vez, pulleando al principio de la sesión de codeo y pusheando al final.

### Instalando la App

Si tu compañero quiere correr la app que pulleó, debería instalarlo.

```sh
npm install
```

Esto lee el `package.json` de la app y descarga las dependencias dentro de node_modules.

Porque fue esto necesario? Recuerda que estamos excluyendo el directorio `node_modules` a través de `.gitignore`. Por lo tanto, `npm install` es un paso necesario. Esto revela lo importante que es hacer `--save` cada vez que instalamos una dependencia!


## Agregando Nunjucks como Templating Engine

### Templates en General

Un templating engine es un programa que renderiza documentos finales (e.g. archivos HTML) basados en templates. Un template es un esquema o plan para un documento, que puede ser combinado con data para completarlo.


```
archivo template + objecto local -> función rendeadora -> html completo
```

Los templates nos permiten re usar nuestro HTML. Por ejemplo, cada página de perfil en un app, puede compartir una forma; un templating engine nos permite escribir una sola representación de esa forma. Los lenguajes de templating también añaden un poco de sintaxis programática al HTML, como if, forEach, etc. 


#### Nunjucks

Para nuestra app del clon de Twitter, vamos a usar el [templating engine de Nunjucks](https://mozilla.github.io/nunjucks/).

### Instalación

Nunjucks esta disponible como un Node module. **Instalalo y requerilo** (como `nunjucks`) en tu app. 

### Un Template Básico

Por razones de testeo, agreguemos un esqueleto de Nunjucks template a nuestra app. En realidad, ya tenemos un template; ocurre solo que esta vacío por el momento. Copia este código en `views/index.html`:

```html
<h1>{{ title }}</h1>
<p>Esto es un esqueleto de un template.</p>
<ul>
{% for person in people %}
  <li>{{ person.name }}</li>
{% endfor %}
</ul>
```

Echa un vistazo al markup template. Las expresiones están encerradas en tags `{{...}}` son variables, y expresiones en `{% ... %}` son tags lógicos. Cuando pasamos a Nunjucks alguna data para renderizar esta vista (la cual llamamos variables locales), va a interpolarla (llenarla) con los valores que queremos. Estamos casi listos para testear nuestro código...


### Probalo

En un momento vamos a integrar nunjucks con nuestra aplicación de express. Aún nunjucks como un herramienta fundamentalmente independiente de express, servidores, http y cualquier otra cosa, en su núcleo es cómo mad libs: toma algún texto con espacios en blancos para rellenar y unas cosas para rellenar los espacios en blanco, y devuelve un texto con los espacios en blancos rellenados.

Usando nunjucks.configure y nunjucks.render, tratá hacer un script simple que use tu template para loggear:

```html
<h1>Un Ejemplo</h1>
<p>Esto es un esqueleto de un template.</p>
<ul>
  <li>Gandalf</li>
  <li>Frodo</li>
  <li>Hermione</li>
</ul>
```

+++Respuesta...
```js
// en algunos archivo que este en el directorio raíz de nuestra aplicación... por ejemplo app.js

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});
```
+++


### Integración

Para usar las habilidades de Nunjucks en nuestra app de Express, vamos a necesitar:

- [app.engine](http://expressjs.com/en/4x/api.html#app.engine): para usar `nunjucks.render` como la función para renderizar html
- [app.set](http://expressjs.com/en/4x/api.html#app.set): configuramos el default `view engine` a html (para no tener que especificarlo en cada render).
- [nunjucks.configure](https://mozilla.github.io/nunjucks/api.html#configure): configura el path del view a nuestra carpeta `views` (donde guardamos nuestros templates)

Estas lineas son código "boilerplate" que no varía mucho entre proyecto y proyecto. Puedes usar los links de arriba + el "Getting Started" de la documentación de Nunjucks para intentar unir a Nunjucks-Express por tu mismo. Sin embargo, el valor:tiempo ratio de este desafío es bajo, entonces ve adelante y usa el siguiente snippet de código si no lo resuelves rápido.

+++Nunjucks-express
```js
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates
```
+++ 

### Cacheo 

Cachear una vista guarda el documento renderizado y solo re-renderea si la data cambió. Esto es importante en el sitio de producción, pero durante el desarrollo se cruza en nuestro camino si estamos constantemente cambiando código. Apagá el cacheo de Nunjucks en `app.js` encendiendo la opción `noCache` en `nunjucks.configure`, de esta manera: `nunjucks.configure('views', { noCache: true })`.


### Rendereando los Template

En `app.js` estas probablemente usando res.send() o algo similar para mandar algún texto. Renderiemos nuestra vista del index en cambio, pasando alguna data para usar. 

```js
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
res.render( 'index', {title: 'Hall of Fame', people: people} );
```

Lee [los docs de Express para `res.render`](http://expressjs.com/en/4x/api.html#res.render). Esta función pasa `index.html` al view engine de Express (Nunjucks). Nunjucks usa esta data para popular las variables locales en el template (title y people), hasta loopeando sobre el arreglo de personas para construir tres `<li>` tags. Express luego envía el documento HTML completado como una respuesta al browser.

### Probá

Iniciá tu app y visitalo en el browser. Si todo esta bien, verás nuestro template mostrando el contenido que le pasamos. Nada mal no!? No te olvides de commitear…

Cambiá la data que res.render envía, y mira como tu template es construido acordemente. Puedes también tratar cambiar los templete para que usen diferentes tags; vé a la [documentación de Nunjucks sobre templating](https://mozilla.github.io/nunjucks/templating.html) para ejemplos.

## Almacenamiento de Datos no Persistente del Lado del Servidor

### Repaso: Node Modules

Hemos visto que hay tres formas de requerir módulos:

- Si el módulo esta hecho **dentro de Node**, podemos simplemente usar el nombre: `var fs = require('fs')`
- Si el módulo fue **instalado via npm**, podemos usar el nombre: `var nunjucks = require('nunjucks')`
- Si el módulo es uno que nosotros hemos escrito, necesitamos el path: `var greeter = require('./greeter')`

#### Paths relativos y Require

El string del path es relativo al archivo en donde estas haciendo el require. Si necesitamos un archivo en:

- Un directorio arriba, el path empieza con `'../'`
- El mismo directorio, el path comienza con `'./'`
- un sub-directorio "utils", el path comienza con `'./utils/'`

#### El módulo por default es index.js

Si requerís una carpeta sin especificar un archivo, Node va a asumir que querés el `index.js` (si hay uno) en esa carpeta. Por lo tanto estas cuatro expresiones  son equivalentes:


- `require('./routes')`
- `require('./routes/')`
- `require('./routes/index')`
- `require('./routes/index.js')`.

### Haciendo un Módulo tweetBank.js

**Haz un modulo `tweetBank.js`** en tu directorio `twitter-js`. Este módulo va a ser responsable de mantener todos los tweets y darnos métodos para interactuar con ellos.

#### Lodash.js

El modulo `tweetBank` va a usar la popular librería de utilidades Lodash. Lodash provee una larga lista de funciones Javascript útiles. Instala el modulo npm `lodash` y agregalo como `_` (el carácter de guión bajo) a `twitterBank.js`.

```js
const _ = require('lodash');
```

> Nota como nuestro script de `app.js` depende de numerosos módulos (Express, Morgan, Nunjucks, etc.) pero tweetBank.js solo depende en uno (Lodash). Conectando dependencias con un sistema de módulos hace mas fácil de entender la estructura y complejidad general de una aplicación 

#### Data

Agrega un arreglo `data` al modulo `tweetBank` - como una variable, no un export. Esto a a guardar los tweets.

### Definiendo las funciones de tweetBank.js

Vamos a guardar los tweets en el arreglo `data`, pero no queremos hacer este arreglo accesible directamente al resto de nuestra aplicación; va a permanecer a salvo dentro de `tweetBank.js`.

Lo que vamos a hacer disponible, usando `module.exports`, son funciones para agregar, listar y encontrar tweets. Agregá el código de abajo a tu modulo `tweetBank`.

```js
function add (name, content) {
  data.push({ name: name, content: content });
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find };
```

Lee la documentación de Lodash sobre [`._cloneDeep`](https://lodash.com/docs/4.17.4#cloneDeep) y [`_.filter`](https://lodash.com/docs/4.17.4#filter). Discutí las implicaciones con tu pareja.

### Sembrando tweetBank.js con Data de Muestra

Dado que nosotros no tenemos ningún usuario real posteando a nuestra Twitter app, generemos un poco de tweets falsos para testear y dar estilo. Copia el siguiente código al final de tu archivo `tweetBank.js`.

```js
const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}
```

### Testeando el Módulo

Tratá escribiendo `console.log(data)` al final de tweetBank.js y corriendo el modulo manualmente con `node tweetBank`. Toma un vistazo a los resultados. 

De que otra manera puedes usar tweetBank? Experimenta con cada función expuesta por el `module.exports`. Testeando find va ser difícil con data aleatoria; agrega un poco de data predefinida para buscar.

Cuando estés satisfecho, remueve tu código para testear/debuggear temporario y continua con el workshop.

## Routing y Views

### HTTP

Antes de poder entender routing, necesitamos un conocimiento de pedidos y respuestas HTTP. HTTP es el estándar de comunicación en la web. Usa el modelo de cliente-servidor, donde el servidor tiene recursos que el cliente puede querer. Un cliente puede requerir un recurso, donde el servidor dependiendo el caso responde con data. El servidor no puede iniciar la comunicación; solo puede responder a pedidos.

Pedidos y respuestas tienen un campo `header` - donde hay meta-data técnica para que el protocolo funcione. También tienen algunas propiedades importantes mostradas abajo.

#### Pedidos HTTP 

- Un [URI path](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)(Uniform Resource Identifier) - un string rotulado, por ejemplo `/tweets/123`. Esto no es necesariamente un path de un archivo! Es solo un identificador, como "`tweets del 23 de Enero` o `tweet #123`".
- Un **método** (o **verbo** ) explicando que quiere el cliente hacer con el recurso. Interpretar los verbos depende completamente del código del servidor, pero hay patrones típicos:
    + GET: dar el recurso
    + PUT: actualizar el recurso con una data
    + POST: crear un recurso usando una data
    + DELETE: eliminar el recurso
    + […y otros…](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
- Un mensaje opcional(`body`) conteniendo data (JSON, XML, etc.)

#### Respuestas HTTP

- Un status code indicando como el servidor maneja el request (Success, Not Found, etc.)
- Un mensaje opcional (`body`) conteniendo data.

#### Ejemplo

Digamos que querés ver un tweet específico (#5) en Twitter app. Escribes la dirección `http://localhost:3000/tweets/5` en tu browser y presionas enter.

1. El buscador ve que debería usar el protocolo `http para hacer y enviar requests.
2. Se dirige a la computadora y al puerto al `localhost:3000` (tu propia computadora).
3. Envía el pedido con VERB-URI `GET /tweet/5` (El recurso de interés).
4. El servidor escuchando en esa dirección y puerto recibe el pedido.
5. El código del servidor rutea el pedido a la función encargada basado en el verbo y el URI.
6. La función corre y genera la respuesta (por ejemplo, status code `200` y body `<html>…un archivo html mostrando el tweet #5…</html>`).
7. El servidor manda la respuesta devuelta al browser
8. El browser decide que hacer con la respuesta basado en el status code del body (por ejemplo, mostrar un HTML entregado satisfactoriamente)

### Rutas en General

Ahora que estudiamos HTTP, hablemos de routing. Vimos como, dependiendo en el método del pedido HTTP un URI (por ejemplo, POST `/tweets/`), el servidor  va a "rutear" el pedido a una función específica. Hay infinidades de posibles rutas; aquí hay dos ejemplos contrastantes.

- Rutear todos los pedidos a una sola función que envie la respuesta "sitio en construcción".
- Rutear pedidos GET & POST para `/tweets/` a dos distintas funciones:
    + una para enviar una página HTML de tweets.
    + Otra para añadir los tweets a nuestro data store (y mandar un status OK devuelta). 

### Express Routes

Entonces, routing es solo código que dirige un pedido HTTP entrante a una función específica. Como ruteamos pedidos en Express? Fácilmente: con `app.METHOD(path, handler)`. Fijate en los documentos para [`app.METHOD`](http://expressjs.com/en/4x/api.html#app.METHOD) y también lee el articulo sobre [Basic Routing](http://expressjs.com/en/starter/basic-routing.html). Debajo hay algunos ejemplos para rutear ciertos pedidos HTTP:


| **HTTP Method** | **URI path requested**                             | **Express route**               |
|-----------------|----------------------------------------------------|---------------------------------|
| GET             | [http://localhost/](http://localhost/)             | `app.get('/', myFunc1);`        |
| GET             | [http://localhost/tweets](http://localhost/tweets) | `app.get('/tweets', myFunc2);`  |
| POST            | [http://localhost/tweets](http://localhost/tweets) | `app.post('/tweets', myFunc3);` |

¿Qué reciben los handlers (como la funcion myFunc de arriba)? En general tres objetos.

- `req`: un objeto representando el request ([documentación](http://expressjs.com/en/api.html#req))
- `res`: Un objeto permitiendo a Express construir y enviar una respuesta para un request específico ([documentación](http://expressjs.com/en/api.html#res)) 
- `next`: una función que envia el request a un próximo handler en una cadena (necesario para middleware & y routing de múltiples pasos).

**Lectura adicional**: La [documentación de routing](http://expressjs.com/en/guide/routing.html) completa de Express tiene muchos ejemplos bien escritos.

### Una ruta inicial

Suficiente teoría, vamos a codear! 

---

#### app.js

**Remueve las rutas viejas** de `app.js`. Mantené cualquier middleware (app.use) o configuraciones (app.set), por supuesto.

En vez de contaminar nuestro ordenado app.js con complejidades del routing y lógica de la aplicación, vamos a poner nuestras rutas en un modulo. Entonces require la carpeta `routes` (recuerda, esto require el exports de `index.js`) y lo registra como middleware para todas las rutas comenzando con `/` ('eso es todo'.) 

```js
const routes = require('./routes');
app.use('/', routes);
```

#### routes/index.js

Aquí hay una rápida ruta para la homepage para comenzar.

```js
const express = require('express');
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

module.exports = router;
```

Espera - router.get? No debería ser app.get?

Esta es otro uso para el modulo de Express: Puede crear una entidad de un `router` que es configurable por fuera de la instancia de la aplicación. Piensa en el `router` como una caja para rutas; una 'mini-aplicación' solo capaz de realizar middleware y funciones de routing. Todas las funciones de `app.VERB` pueden ser escritas como `router.VERB`([docs](http://expressjs.com/en/api.html#router.METHOD)). Exportamos este `router` para que `app.js` pueda usarlo como un middleware handler para todas las rutas y sub-rutas `/`. En otras palabras, le decimos a `app.js` "aquí usamos esta caja llena de rutas que hicimos en un archivo separado".


### Templates Pre-Hechos

Para no perder tiempo. vamos a usar elementos de diseño pre-escritos

### Stylesheet

Agrega el archivo styles.css desde [este gist](https://gist.github.com/guilleasz/a2e051c7a80447bf994f8f525e28232f) a `public/stylesheets/`.

### Templates

En `views/`, reemplazá los templates `index.html` y `layout.html`  usando [este gist](https://gist.github.com/guilleasz/ff98c67d687c5c47b9f4945ad849297b)

Nota que en la parte de arriba de `index.html` dice `{% extends "layout.html" %}`. Esto es *inheritance*. Cuando Nunjucks renderiza `index`, va a automáticamente embeber el template dentro de `layout` (en el tag `{% block content %}`) y renderiza ambos en un solo archivo. Otras páginas van a también ser capaz de extender `layout` en esta manera, significando que solo vamos a preocuparnos sobre el contenido único de cada página.


### Static Routing

Casi estamos…

Twitter.js usa CSS para el estilo. Mirá la linea 13 del `layout.html`. El `link` tag automáticamente dispara un get HTTP get request al URL asignado al atributo `href`. Mientras el servidor responda con un archivo CSS, todas las reglas dentro de ese archivo van a ser aplicadas al HTML de nuestra app. La linea 13 esta tomando un template de Bootstrap vía *Bootstrap's content delivery network* (CDN). Podes copiar y pegar el URL en el browser para ver que es servido! 

Ahora mirá la linea 16 en el mismo archivo (`layout.html`). Parece como que el browser va a hacer un GET request a `/stylesheets/styles.css`. Donde esta el resto de la URL? No esta faltando. Como no hay ningún dominio provisto, este `link` tag va a hacer un pedido al servidor mismo que esta sirviendo el archivo `index.html`. Eso seria nuestro servidor! No hemos definido esa ruta para ese archivo, entonces si visitamos tu web app vamos a ver un error 404 en la terminal.

Ahora andá y creá una ruta para servir este archivo. Cuando hayas terminado vas a hacer capaz de ir a `localhost:3000/stylesheets/styles.css` desde tu browser y recibir el archivo CSS renderizado en tu browser

+++Approach...
El objeto `res` de Express tiene un método `.sendFile` que toma un el path de un archivo y sirve los contenidos del archivo que encuentra ahí.
+++

¿Realmente necesitamos escribir una ruta para cada uno de los archivos? Parece como que podríamos crear un middleware que intente mapear cualquier ruta entrante a un archivo. De hecho, un middleware así ya existe. [Lee la documentación para `express.static`](http://expressjs.com/en/starter/static-files.html) e incorporar rutas estáticas en tu aplicación para el directorio public.

Ahora, todo que pusimos en public va a ser automáticamente accesible vía URI path, como si fuera un filepath (recuerda, normalmente no lo es!). Eso incluye `public/stylesheets/styles.css`, que el browser puede pedir con GET `/stylesheets/style.css`.

Que otras razones podríamos preferir este tipo de static routing? Aquí otros dos casos frecuentes:

- Una carpeta con docenas de imágenes que forman parte de la presentación de tu sitio.
- Una carpeta de archivos Javascript, para que el código sea descargado y corrido del lado del cliente.

Imagina teniendo que escribir rutas individuales para servir cada uno de los potenciales archivos. Static routing se encarga de eso por nosotros, automáticamente; ahora todo lo que necesitamos es dejar un archivo dentro de public, y Express va a automáticamente rutear pedidos por el.

#### Extra Credit

`express.static` no es magia! Puedes tratar escribir tu propia versión de este middleware si quisieras.

+++Approach...
Para cada request entrante:

- Mirá si esa ruta mapea a un archivo valido en el directorio public.
- Si no, avanza al próximo middleware(`next`).
- Si el archivo machea, enviá su contenido.
+++ 

### Live Test

Cambiamos un buen número de archivos; es hora de ver si todo fue como planeado. Visita `http://localhost:300` y deberías ver una linda front-page formateada con al menos diez tweets en una lista. 

#### Success?

Con tantos cambios en tu código es sorprendente si no hay ningún error en algún lado. Asegurate de fijarte en tu terminal y browser para errores loggeados en la consola. Si tenes la ruta de la front-page funcionando, ahora es buen momento para hacer un Git commit.

### Enriqueciendo nuestro Tweet View

Customizá el template `views/index.html`. Mejorá el tweet display para que se parezca similar al screenshot de abajo - usando los tweets actuales viniendo de tu data store. Tu objetivo principal es mostrar los nombres. Usa algo de HTML & CSS para mejorar la presentación, también. No pierdas mucho tiempo acá; estira tus músculos de styling un poco y continua. 

![screenshot](./screenshot)

**TIP**: Mira a tags lógicos `{% ... %}` al final de `index.html` para ver como el objeto de tweets esta siendo accedido. ¿De dónde vienen estos tweets? Comprenden la data que pasamos dentro de res.render en el código de nuestro router.

Vas a necesitar usar algo similar para renderizar la persona asociada a cada tweet. Referencia: [la documentación de Nunjucks](https://mozilla.github.io/nunjucks/templating.html).


### Dynamic Routing con Parámetros

Ahora mismo, nuestro servidor tiene una ruta. Esto significa que los usuarios pueden hacer solo una cosa: Mirar un feed de todos los tweets. Queremos mas rutas, rutas que permitan a los usuarios:

- Mirar los tweets de un usuario específico.
- Escribir nuevos tweets.

#### Parámetros del Request

Otra manera de pensar las rutas es que "atrapan" pedidos.

```js
router.get( '/users/:name', someFunction );
```

Atraparía el pedido GET `/users/guille` (y después llamaría `someFunction`, pasando el req y res). 

Que esta nueva parte, `:name`, del URI? Los dos puntos `:` es un truco que Express provee para definir particulares porciones del URI string como variables. En otras palabras, en `users/:name`, el `:name` puede ser cualquier cosa. Estos parámetros del URL son detectados y guardados como propiedades del objeto `req.params`:


```js
// digamos que el cliente pide un GET a /users/guille
router.get( '/users/:name', function (req, res) {
  console.log( req.params.name ); // --> 'guille'
});
```


Aquí hay más ejemplos para hacer esto mas claro.

```js

router.get( '/store/:product/reviews/:id', function (req, res) {
  // usa req.params aquí
});
```


| **HTTP Request**                | **req.params.product** | **req.params.id** |
|---------------------------------|------------------------|-------------------|
| GET store/licuadora/reviews/51  | `'licuadora'`          | `'51'`            |
| GET store/licuadora/reviews/8   | `'licuadora'`          | '`8'`             |
| GET store/microondas/reviews/197| `'microondas'`         | `'197'`           |


### Agregá una Ruta y View para un solo usuario

En orden de mostrar todos los tweets para un usuario específico, tu ruta debería verse (casi) como esto:

```js
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( { name: name } );
  res.render( 'index', { list: list } );
});
```

Sin embargo, hay un bug en el código de arriba. Mira como el objeto data para `res.render` esta definido, y comparalo con lo que nuestro templete esta esperando.

Luego de arreglar la función render, tu nueva pagina debería funcionar. Probalo en `http://localhost:3000/users/username` sustituyendo `username` con el nombre de alguien que haya tweeteado. 

#### Agregando links al perfil del usuario en el Template.

Podemos linkear a esta nueva página en nuestro template. Agrega links al loop en `views/index.html` para que cada nombre lleve al view de tweets del usuario correcto. Debajo hay un ejemplo de como podrías hacerlo, pero vas a neceistar adaptar el código para que machee con tu diseño actual.

```html
{% for tweet in tweets %}
  <li><a href="/users/{{tweet.name}}">{{tweet.name}}</a> - {{tweet.content}}</li>
{% endfor %}
```

Ahora podemos clickear en los nombres de usuarios y mirar sus perfiles.

> Cada vez que tu servidor comienza, el data-store es regenerado con data aleatoria. Si dejas la página abierta, luego reinicias el servidor, los links a los usuarios no van a funcionar.

> Los caracteres de espacio en URLs son encodeados como `%20`. 

### Challenge: Agregá una Ruta para un Tweet. 

Agreguemos la ruta `/tweets/:id` la cual va a mostrar una página con un solo tweet. Este ejercicio va a combinar routing, templating, y diseño de módulos.

1. Modifica `tweetBank` para que cree una propiedad de un ID único para cada tweet insertado cuando `tweetBank.add()` es llamado. La función debería hacer esto por vos - `add` va a seguir solo aceptando dos parámetros.
2. Usa `tweetBank.find()` para buscar el tweet correcto en nuestra nueva ruta.
3. Agregá links generados dinámicamente en el template de `views/index.html` por cada tweet listado. Los links deberían apuntar a la página de ese tweet. Entonces para un tweet con id `7`, el tweet llevaría al link `tweets/7`.

Hay un sutil y potencialmente frustrante pedacito lidiando con el parámetro del request vs el ID del tweet. ¿Puedes resolverlo? Si te esfuerzas demasiado, fijate en la pista de abajo:


+++Por qué no encuentra el tweet?
Bueno, `req.params.id` es un STRING. Si haces GET `/tweet/5`, luego `req.params.id === '5'`. Pero tus tweets (probablemente) tienen NUMBER ids! Esta discrepancia significa nuestro `find` va a fallar siempre. No debería ser muy difícil encontrar una solución para esto…
+++

## Forms y Requests HTTP

### Agregando un Form al Template

Hasta ahora, nuestra aplicación lista tweets de nuestro data-store, lo cual esta bastante bien. ¿Cómo podemos hacer esto mas interactivo? Programemos un formulario que nos va a permitir postear nuevos tweets.

El primer paso es agregar la estructura del form a nuestro template. Encuentra un lugar adecuado en `views/index.html` para agregar el siguiente código de Nunjucks:

```
{% if showForm %}
  <form action="/tweets" method="POST">
    <label for="name_field">Name:</label>
    <input name="name" type="text" id="name_field" />

    <label for="text_field">Text:</label>
    <input name="text" type="text" id="text_field" style="width: 350px;" />

    <input type="submit" value="Submit" />
  </form>
{% endif %}
```

Nota que tenemos una declaración rodeando el form, con una condición llamada showForm. Esto es para que podamos elegir para que páginas mostrar el form, dependiendo en la ruta. Nuestras rutas van a tener que renderizar template usando `showFrom: true` si queremos que se muestre en la página.


### Parseando un HTTP Body

Examina el form cuidadosamente; mira el atributo `method="POST"`. Esto significa que cuando este form sea submiteado, va a enviar un pedido HTTP con el método POST. ¿Cómo nuestra data es enviada? Recuerda que un pedido HTTP puede tener un body opcional conteniendo data. Nuestro form va a escribir este body por nosotros cuando hace el request.

Sin embargo, esto nos presenta un problema. Express es bastante liviano… tan liviano que no viene con ninguna forma de digerir un HTTP body. El mensaje body en HTTP puede ser enviada en formatos muy diferentes, tal como un complejo string url-encoded. Aquí un ejemplo:

```
name=Jonathan+Doe&age=23&formula=a+%2B+b+%3D%3D+13%25%21
```

Podríamos escribir una función para parsear este string y mapear el `name`, `age`, y los valores de `formula` embebidos como propiedades en un objeto `body` customizado; que va a ser más conveniente de usar en nuestro código del servidor. Sin embargo, la función va a tener que tomar en cuenta diferentes tipos de data encoding, separadores, payloads, etc.

En vez de escribir **body parser** nosotros mismos, usemos un módulo maduro y testeado.

#### El Módulo body-parser


**Instalá y requerí `body-parser`** ([documentacion aquí](https://github.com/expressjs/body-parser)). Vas a querer registrar middleware para tu app que pueda parsear un url-encoded body (este es el tipo de data que HTML forms crea). También, en la mayoría vas a querer JSON-parsing middleware. Hay ejemplos de ambos implementados en el [ejemplo de Express en los docs](https://github.com/expressjs/body-parser#examples).

**Agregá url-encoded y JSON body-parsing middleware a tu app** Notá que el orden en el cual haces las cosas es importante; asegurate de agregar `body-parser` lo suficientemente antes en tu código. 

---

¿Qué hace esto por nosotros? Ahora, cada request body va a transformarse en un objeto `body` dentro del objeto `req`. Para poder acceder a variables en body como `req.body.name` y `req.body.content`. Fácil!

### Routing y Respondiendo a envíos del Form   

De nuevo a implementar nuestro form. En la ruta relevante, cambia el llamado de `res.render()`  para pasar una propiedad `showForm`. Vamos a mostrar el form en la página index, pero ocultarlo en la página `/users/:name` 

```js
res.render( 'index', { tweets: tweets, showForm: true } );
```

#### Creando la ruta para envíos del form

Si los haz notado, nuestro form tiene el atributo `action="/tweets`. Este es el URI que el form va a usar para ese POST request. Sin embargo, nosotros no tenemos aún ninguna ruta definida para POST `/tweets`. Escribamos esa ruta ahora. 

```js
router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});
```

Aquí estamos tomando la información del form de la propiedad `req.body` y poniéndolos dentro de nuestro data store. Los nombres de cada propiedad corresponden a la propiedad `name` de cada `<input>` tag en nuestro form.

Una vez que terminamos agregando el nuevo tweet a nuestro store, lo redirigimos al cliente a hacer un nuevo request para página index usando `res.redirect` para que inmediatamente vean el nuevo tweet submiteado.

### Campos Pre-Populados Dinámicamente

Ahora que tenés un buen entendimiento de como Express funciona, aquí hay un pequeño ejercicio. En vez de esconder el form en la pagina de `/users/:name`, mirá si podes en cambio poner el parámetro `:name` en el valor del campo `name` del form. De esta forma podemos crear nuevos tweets como ese usuario muy convenientemente.

Para pre-completar texto dentro de un elemento `<input>`, podes definir su propiedad `value` de esta forma: 

```html
<input name="name" value="Este es un texto" />
```

## Actualizaciones en Tiempo Real con Sockets

### Socket.io

> Esta sección es un poco de un bonus/preview - vamos a aprender más sobre sockets en futuros workshops. 

[Socket.io](https://socket.io/) es una librería para usar el protocolo de *WebSockets* - permitiendo comunicaciones simultaneas, bidireccionales, en tiempo real. Socket.io te permite:

- Hacer *listeners* que esperen para un evento con nombre y luego llamar sus funciones.
- hacer *emitters* que envíen un evento con nombre con alguna data.

La parte sorprendente es que los listeners y emitters pueden correr en maquinas totalmente separadas. En esencia, Socket.io arma un servidor usando WebSockets, corriendo al lado de nuestro servidor de Express que usa HTTP - ambos escuchando por el mismo puerto! Usando sockets hace a tu app mucho mas responsiva, sin actualizaciones de la página necesarios.   

### Agregando Socket.io al Cliente

Agrega la librería de cliente de `socket.io` en un script al final de `layout.html` antes del closing-tag `</html>`

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  // Carga la librería socket.io arriba, luego conectalo al servidor.
  // Porque el servidor socket.io esta siendo corrido en el mismo servidor
  // que tu instancia de Express, podes connect() sin ningún argumento.  
  var socket = io.connect();
  socket.on('connect', function(){
    console.log('conectado al servidor via WebSockets!');
  }); 
  // Cuando el evento 'new_tweet' es disparado, haz algo con el tweet enviado.
  socket.on('newTweet', function (tweet) { 
    console.log(tweet);
    alert('Actualizando... fijate en la consola...');
    // Alguna lógica para agregar el tweet al DOM
  }); 
</script>
```

> Esperá, ¿Cómo podemos del HTML del lado del cliente pedir `/socket.io/socket.io.js` de nuestro servidor? No hemos escrito esa ruta. La respuesta es  que cuando le damos a Socket.io la instancia del servidor, va a agregar su propia ruta para ese path, el cual devuelve el archivo `socket.io.js` (el cual es en realidad en uno de los sub directorios de `node_modules`)

    
### Agregando Socket.io al Servidor

Instalá Socket.io.

Socket.io necesita ser dado una instancia del servidor. En app.js, ya estas empezando un servidor (`app.listen`). Esa función devuelve una instancia del servidor; tenés que guardarlo en una variable. 

```js
var socketio = require('socket.io');
// ...
var server = app.listen(3000);
var io = socketio.listen(server);
```

El objeto io provee todas las funcionalidades de socket del lado del servidor.


#### Dilema

Tenemos un pequeño problema ahora. Queremos que `io` emita un evento en nuestras rutas, pero ponemos eso en un modulo separado. Podríamos exportar `io` de `app.js`, peor no podemos requerir app.js en nuestro modulo router... porque ya requerimos el módulo router en app.js! Node no resuelve automáticamente dependencias circulares y este tipo de ciclos son difícil de codear apropiadamente y mantener. 

socket.io necesita al servidor - el servidor necesita app - app necesita routes - routes necesita socket.io

¿Qué podemos hacer? Hay varías aproximaciones. Una de las mas fáciles es poner la función `io` en el scope global, sin embargo, en cambio, usaremos una técnica de functional programming.

### Refactoreando el Módulo Routes

- **Antes:** routes `module.exports` `router`
- **Después:** routes `module.exports` una función que toma `io` y devuelve `router`

Remueve la linea de `module.exports` actual del módulo routes. En cambio, agrupa el código existente en una función que devuelve el router:

```js
module.exports = function (io) {
  // ...
  // definiciones de rutas, etc.
  // ...
  return router;
};
```

Si pasamos una instancia de `io` a esta función, vamos a ser capaces de usarlo en nuestras rutas. 

### App Module

- **Antes:** hacíamos `app.use` en el modulo routes directamente.
- **Después:** hacemos `app.use` en el router devuelto por `routes(io)`

No hemos terminado aún. En `app.js`, el middleware asignando `routes` a `/` no va a funcionar. Recuerda, nuestro modulo de rutas no exporta mas un router, exporta una función que devuelve un router. Entonces, necesitamos llamar a `routes`, pasando `io`, para obtener el router.   

```js
app.use( '/', routes(io) );
// o:
// var router = routes(io);
// app.use( '/', router );
```

Y ahí lo tienes - modular routing junto a Socket.io.

---

**TIP:** Antes que continúes refresca tu página y testeala para estar seguro que todo funciona como antes. 

### Cargando Nuevos Tweets Dinámicamente

#### Server-Side

En algún lugar en tus rutas vas a querer **emitir el evento 'new_tweet'**. La linea se ve como esto:

```js
io.sockets.emit('newTweet', { /* tweet info */ });
```

Vas a necesitar, por supuesto, definir el objeto tweet que es pasado.

#### Client-Side

Ya tenes un script corriendo en `layout.html` que escucha eventos. Cuando hayas confirmado que tus sockets se estén comunicando, descifra como tomar la data recibida y añadir el nuevo tweet al DOM. Esto va a requerir construir HTML nuevo y adjuntarlo con el API del DOM. (Esta bien modificar tu template - ¿quizás quieras agregar un id a un elemento?) 

**Prueba tu sistema** ya sea visitando el sitio de tu pareja (a través de su dirección IP y puerto del servidor), o usando un incógnito / ventana privada.

¿Por qué necesitamos agregar el tweet al DOM? ¿No estamos ya refrescando la página? Realmente, estamos solo refrescando la página para un solo cliente - el que esta haciendo el POST request. Ese eres tu. Para cualquier otra persona mirando a la página, nunca pidieron data nueva, por lo que no reciben ninguna respuesta; es por eso que necesitamos sockets para decir a todos los clientes que hay nueva información. Con sockets, el servidor puede avisar a los clientes sin esperar un request.
