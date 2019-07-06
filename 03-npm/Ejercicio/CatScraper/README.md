# LolCats Scrapper

Vamos a descargar las imagenes de [LolCats]("http://lolcats.com") en nuestra computadora usando node y algunos paquetes interesantes.

Para hacer este ejercicio van a tener que buscar información y documentación por su cuenta, pero aqui van algunos tips:

1. Para llamar a la página de LolCats y a sus imagenes vamos a usar el paquete [request](https://github.com/request/request)
2. Para manipular su contenido vamos a usar [cheerio](http://cheerio.js.org/), este es un JQuery para el servidor.
3. Para crear carpetas y nuevos archivos vas a necesitar fs.

## Requisitos

1. Crea un package.json

2. Instala request y cheerio con --save y requierelos en tu app.js

1. Crear una nueva carpeta "catPhotos" usando Node.

2. Hacer un request a CatLol y con cheerio crear un arreglo de los links de las imagenes.

3. Una vez creado el arreglo con request busca cada imagen y con fs descargala en la carpeta creada.([Mira aquí](https://github.com/request/request#streaming)). __Importante:__ Los nombres de las imagenes deben ser los mismos que el del link.

4. Una vez que hayas hecho lo anterior, refactorea tu codigo para que puedas bajar automaticamente las imagenes de las diez primeras páginas de CatLol
