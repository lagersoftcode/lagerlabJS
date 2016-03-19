import express from 'express';
import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';

let experiments = [];
let experimentBasePath = 'build/public/experiments/';
let experimentDirs = getDirectories(experimentBasePath);

experimentDirs.map(exp =>{
  let data = jsonfile.readFileSync(experimentBasePath + exp + '/data.json');
  experiments.push({
    id: data.id,
    name: data.name,
    description: data.description,
    image: 'experiments/' + exp + '/' + data.image,
    date: data.date,
    devs: data.devs,
    scripts: data.scripts
  });
});

let app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server started on port 3000')
});


app.get('/', (req, res) => {
  res.render('index', {experiments: experiments});
});

app.get('/experiment/:experiment', (req, res) => {
  var reqExperiment = experiments.find(exp => exp.id == req.params.experiment);
  if(reqExperiment === undefined){
    res.redirect('/');
  }else{
    res.render('experiment', {experiment: reqExperiment});
  }
});

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
