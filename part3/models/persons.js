require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB', url);
  })
  .catch(() => {
    console.log('error connecting to MongoDB');
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (str) {
        const [firstPart, secondPart] = str.split('-');
        return (
          firstPart.length >= 2 && firstPart.length <= 3 && Number(secondPart)
        );
      },
    },
  },
});

const Person = mongoose.model('Person', personSchema);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
