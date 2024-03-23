
![demo](https://github.com/BrunoEspindolaDev/scraper/assets/58474402/9915ffdd-79de-4321-852b-1bdad1493903)

#### Original URL
https://www.google.com/maps/search/restaurantes+em+porto+alegre/@-30.0319617,-51.2288955,14z/data=!3m1!4b1?entry=ttu

#### .env
```javascript
BASE_URL=http://google.com
QUERY=restaurantes+em+porto+alegre+RS
COORDINATES=@-30.0319617,-51.2288955,14z
HL=pt-br
```

#### Results
```javascript
[
  {
    "phone": "(51) 3012-8595",
    "image": "https://lh5.googleusercontent.com/p/AF1QipN9sstzHJNi6NBvJDNXLYhI-7Jm-1SMOOeuviV5=k-no-",
    "title": "Clube do Comércio - Restaurante em Porto Alegre",
    "address": "R. dos Andradas, 1085 - 3° Andar",
    "gpsCoordinates": {
      "latitude": "-30.0303832",
      "longitude": "-51.2308014"
    },
    "placeUrl": "https://www.google.com/maps/place/Clube+do+Com%C3%A9rcio+-+Restaurante+em+Porto+Alegre/data=!4m7!3m6!1s0x9519791027c7c917:0xa00298bebcc8be4c!8m2!3d-30.0303832!4d-51.2308014!16s%2Fg%2F121mkrbb!19sChIJF8nHJxB5GZURTL7IvL6YAqA?authuser=0&hl=pt-BR&rclk=1",
    "dataId": "0x9519791027c7c917:0xa00298bebcc8be4c"
  },
  {
    "phone": "(51) 3012-8595",
    "image": "https://lh5.googleusercontent.com/p/AF1QipN9sstzHJNi6NBvJDNXLYhI-7Jm-1SMOOeuviV5=w408-h272-k-no",
    "title": "Quiero Café",
    "address": "R. dos Andradas, 735",
    "gpsCoordinates": {
      "latitude": "-30.0315532",
      "longitude": "-51.234259"
    },
    "placeUrl": "https://www.google.com/maps/place/Quiero+Caf%C3%A9/data=!4m7!3m6!1s0x9519797b1597ce89:0xc8892d3885076580!8m2!3d-30.0315532!4d-51.234259!16s%2Fg%2F11s413cywd!19sChIJic6XFXt5GZURgGUHhTgticg?authuser=0&hl=pt-BR&rclk=1",
    "dataId": "0x9519797b1597ce89:0xc8892d3885076580"
  },
  ...
]
```


