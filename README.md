# TTH 2.0
## Tasks Timer for Humans

Simple offline application to control the time and cost of all your customer's tasks. Exports to CVS and detailed monthly PDF reports with custom header. Local IndexDB database, JSON import - export.

## Functionalities:
* Languages: Spanish, English.
* Curencies: €, &, $, ¥, Kr, Fr, ₩, ₸, ₮, ₴, ฿, ₽, ₱, R$.
* Detailed PDF export with custom header.
* CSV export.
* Light or dark theme.
* Customer: create, modify and delete, name and cost per hour.
* Task: create, change and delete, name and cost per hour.
* Comment by task.
* Automatic recording of time fragments of each task, possibility of selective deletion.
* Display of time and cost of each task in real time.
* Recosting on the fly, based on the hourly cost of the task and/or client.
* Historical navigation for months.
* Import, export database in JSON..
 
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```
### Main dependencies

 [Vue](https://github.com/vuejs/vue)

[Vuex](https://github.com/vuejs/vuex)

[Moment](https://github.com/moment/moment)

[Dexie](https://github.com/dfahlander/Dexie.js)

[EasyTimer](https://github.com/albert-gonzalez/easytimer.js)

[jsPDF](https://github.com/MrRio/jsPDF)
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
