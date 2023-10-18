var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
var serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.post('/submit-appointment', (req, res) => {
  const { name, date, time, mail } = req.body;

  const appointmentsRef = db.collection('todo');

  appointmentsRef
    .add({
      name: name,
      date: date,
      time: time,
      mail: mail,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);

      res.status(200).send('Appointment submitted successfully');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);

      res.status(500).send('Error submitting appointment');
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
