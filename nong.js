require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a schema for the person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  favoriteFoods: { type: [String], default: [] }
});

// Create a model from the schema
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createPerson = (name, age, favoriteFoods) => {
  const person = new Person({ name, age, favoriteFoods });
  person.save((err, data) => {
    if (err) return console.error(err);
    console.log('Person saved successfully:', data);
  });
};

// Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'John', age: 30, favoriteFoods: ['Pizza', 'Burger'] },
  { name: 'Jane', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
  { name: 'Jake', age: 35, favoriteFoods: ['Tacos', 'Salad'] }
];

const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log('People created successfully:', data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    console.log('People found by name:', data);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log('Person found by food:', data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log('Person found by id:', data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Person updated successfully:', updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName) => {
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log('Person updated successfully:', updatedPerson);
  });
};

// Delete One Document Using model.findByIdAndRemove
const findRemoveById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Person removed successfully:', removedPerson);
  });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (name) => {
  Person.remove({ name }, (err, result) => {
    if (err) return console.error(err);
    console.log('People removed:', result);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (food) => {
  Person.find({ favoriteFoods: food })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log('Query result:', data);
    });
};

const product_id = "Samuel"

// Test functions
createPerson('Alice', 28, ['Sushi', 'Burger']);
createManyPeople(arrayOfPeople);
findPeopleByName('John');
findOneByFood('Pizza');
findPersonById('<person_id>');
findEditThenSave('<person_id>');
findAndUpdate('Jane');
findRemoveById('<person_id>');
removeManyPeople('Mary');
queryChain('Burritos');
