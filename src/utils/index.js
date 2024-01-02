const fs = require('fs');


function readFile(path) {
  let content = fs.readFileSync(path, {encoding: 'utf-8'})
  content = content.toString()
  const rows = content.split(/\r?\n/)
  return rows
}

module.exports.writeFile = (filename, data) => {
    fs.writeFileSync(filename, data, { encoding: 'utf-8' })
}

module.exports.readFileToWL = (path) => {
  let rows = readFile(path)
  rows = rows.slice(1)
  const adds = [], amounts = []
  rows.forEach(element => {
    const cols = element.split(';')
    adds.push(cols[0])
    amounts.push(parseInt(cols[1]))
  })

  return {
    adds, amounts
  }
}


module.exports.readFile = readFile