var fs = require('fs');
var Papa = require('papaparse');

const csvRoutes = 'csv/routes.csv'
const csvStations = 'csv/stations.csv'
const csvLinks = 'csv/links.csv'

const writeJSON = (filename, jsonData) => {
  fs.writeFile(filename, JSON.stringify(jsonData, null, ' '), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

const csvToJSON = (filename) => {
  let filetext = fs.readFileSync(filename).toString('utf-8')

  const output = []

  const jsonData = Papa.parse(filetext, {
    // complete: function(results) {
    //   console.log('Finished:', results.data)
    // },
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })

  //sort by ID if there is an ID entry
  if ((jsonData.data[0]['id'] !== undefined) && 
    (typeof jsonData.data[0]['id'] === 'number')){
    jsonData.data.map((entry) => {
      output[entry['id'] - 1] = entry
    })
    return output
  }

  return jsonData.data
}

const getLinesOnStation = (station, links) => {
  station.lines = []
  links.map((link) => {
    if ( (link.station1 === station.id || link.station2 === station.id)
      && station.lines.indexOf(link.line) === -1 ){
      station.lines.push(link.line)
    }
  })
}

const addLinesToRoutes = (route, links) => {
  const routeLinks = links.filter((link) => link.line === route.id)
  let previous = route.origin

  if (typeof previous !== 'number'){
    return
  }

  let index = 0
  route.path = [previous]
  while (routeLinks.length > 0) { 
    if (index >= routeLinks.length){
      break;
    } else if (routeLinks[index].station1 === previous){
      route.path.push(routeLinks[index].station2)
      previous = routeLinks[index].station2
      routeLinks.splice(index, 1)
      index = 0
    } else if (routeLinks[index].station2 === previous){
      route.path.push(routeLinks[index].station1)
      previous = routeLinks[index].station1
      routeLinks.splice(index, 1)
      index = 0
    } else {
      index++
    }
  }
}

const stationsObject = csvToJSON(csvStations)
const linksObject = csvToJSON(csvLinks)
const routesObject = csvToJSON(csvRoutes)

stationsObject.map( (station) => 
  getLinesOnStation(station, linksObject, routesObject)
)

routesObject.map( (route) => {
  if(route.name.indexOf('*') === -1)
    addLinesToRoutes(route, linksObject)
})

console.log(JSON.stringify(routesObject, null, ' '))

writeJSON('json/stations.json', stationsObject)
writeJSON('json/routes.json', routesObject)
writeJSON('json/links.json', linksObject)
