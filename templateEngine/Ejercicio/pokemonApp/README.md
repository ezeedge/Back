# Pokemon APP

Puedes hacer estos ejercicios con el template de tu elección


## Requisitos Basicos

### Devolviendo valores

 1. Crea un app en la cual se le de la bienvenida al nombre que aparezca en la ruta. Ej. si entra "/toni", decimos "Hola Toni esta por comenzar tu aventura"
 2. Pon un link que diga "Elije un Pokemon" que nos lleve a una ruta con el nombre+"/pokemon" Ej. "/toni/pokemon"

### Corriendo Javascript

 Toma este arreglo y agregalo en tu app:

```javascript
starterPokemons=["Pikachu",  "Squirtle", "Charmander", "Bulbasaur"]

```

 1.  En la ruta "/pokemon" muestralos en una lista desordenada.
 2. Muestra un mensaje arriba de la lista que use el nombre del usario para decirle que clickie un pokemon.
 3. Cada nombre debería ser un link a ese pokemon, ejemplo "toni/pokemon/Pikachu" si clickeamos en Pikachu
 4. En la pagina del pokemon individual, si elije a Pikachu que aparezca un mensaje diciendo "You Choose Wisely", si eligió otro el mensaje dira "You Choose Poorly".
 5. Crea la funcion validPokemon que sea un middleware que se asegure que elegiste un pokemon valido, si no elegiste un Pokemon valido te redireccionara a la lista de Pokemones. Ej. "/guille/pokemon/dfkslsk" me redireccionará a la lista


### Partials y Archivos Estaticos

1. Investiga que son los partials, y como se usan.
2. Haz que todas tus rutas tengan el mismo header y footer.
3. Crea una carpeta public en tu app
4. agrega una hoja de estilo que compartan todos tus views
5. Utiliza esta [carpeta](https://www.dropbox.com/sh/lq433r9bllggpzl/AAAmhzOGSFIiA4PltWlbE98Wa?dl=0) de imagenes y coloca el logo de pokemon al final de todas las páginas


## Advanced Mode

### Post Request

1. Crea la ruta "/" esta deberá tener un form con 'method="POST" action="/"' el cual le pregunte al usuario su nombre. Una vez enviado el nombre se lo redireccionará a la ruta con el nombre indicado.
2. En la página "/pokemon" agrega un  link que diga Agregar nuevo Pokemon, y que lleve a "(nombre)/pokemon/new"
3. En esta página deberia haber un formulario 'method="POST" action="(nombre)/pokemon"' para agregar el nombre de un nuevo pokemon. Enviado el formulario  deberia agregar ese pokemon a nuestro arreglo de pokemones y recargar la lista.


## NightMare Mode

1. Crea un middleware isAPokemon que usando el [API de Pokemon](https://pokeapi.co/) verifique que el pokemon ingresado por el usuario es valido.
2. Agrega el resto de las imagenes de los pokemones a tu carpeta de imagenes, en la página de el pokemon individual se debe mostrar la foto del pokemon, aprovecha q la nombre del pokemon y la imagen es el mismo.
3. Ahora agrega en el formulario la posibilidad de agregar el link de una imagen. Tendras q scrapear esa imagen y mostrarla en la pagina del pokemon
4. Si terminaste ordena tu codigo, pon las rutas en una carpeta aparte, el middleware tamb.
5. Si sientes que algo te quedo muy desordenado refactorealo.
6. Intenta arreglar esos detalles que por ahi fuiste dejando de lado como mayusculas y minusculas en los nombres



__WOOWWW!! Gran Trabajo!!!__ El unico problema que vemos es que cada vez que reiniciamos nuestro servidor el arreglo vuelve a su tamaño original, como podemos mantener guardada la información? Ese es nuestro siguiente gran paso. Base de Datos!!
