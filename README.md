# Drupal CR 2016 - Programación Funcional Reactiva Aplicada a JavaScript
## Twitter Node Stream - Backend
Esta proyecto recibe datos del Twitter API y los modifica de una manera funcional reactiva y los envía mediante PubNub al (frontEnd)[https://github.com/hybrisCole/trend-node-stream-frontend].
###Pasos para ejecutar este proyecto:
- Instalar [node 6.5.0](https://github.com/creationix/nvm)
- Crear una aplicación en [PubNub](https://www.pubnub.com/)
- Agregar las variables de entorno *PUBNUB_PUBLISH_KEY* y *PUBNUB_SUBSCRIBE_KEY* con las llaves de la aplicación anteriormente creada (o escribirlas directamente en el archivo *service/pubnubClient.js* si anda perezoso)
- Crear una aplicación en [Twitter] (https://apps.twitter.com/)
- Agregar las variables de entorno *TWITTER_CONSUMER_KEY*, *TWITTER_CONSUMER_SECRET*, *TWITTER_ACCESS_TOKEN_KEY* y *TWITTER_ACCESS_TOKEN_SECRET* con las llaves de la aplicación anteriormente creada (o escribirlas directamente en el archivo *service/twitterClient.js* si anda perezoso).
- Clonar este proyecto
- Ejecutar **npm install** desde la línea de comandos, en el mismo path de **package.json**
- Ejecutar **npm run start** desde la línea de comandos, en el mismo path de **package.json**
- Para revisar el code linting, puede ejecutar **npm run lint**, o usar [Atom](https://atom.io/) con el paquete *linter-eslint*
