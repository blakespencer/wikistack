const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const routesWiki = require('./routes/wiki.js');
const routesUser = require('./routes/user.js');

app.use('/wiki', routesWiki);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});


db.authenticate().
then(() => {
  console.log('connected to the database');
});

const createTables = async () => {
  // await User.sync()
  // await Page.sync()
  await db.sync({});

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
createTables();
