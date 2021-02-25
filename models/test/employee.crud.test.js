const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');
const Employee = require('../employees.model');
const Department = require('../department.model');

describe('Employee', () => {
  //tworzymy czasową BD
/*  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getConnectionString();
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });*/


describe('Reading data', () => {
  before(async () => {
    const testDepOne = new Department({ name: 'Department #1' });
    await testDepOne.save();
    const department = await Department.findOne({ name: 'Department #1' });


    const testEmpOne = new Employee({ firstName: 'Name #1', lastName: 'Name #1', department: department._id });
    await testEmpOne.save();
    const testEmpTwo = new Employee({firstName: 'Name #2', lastName: 'Name #2', department: department._id });
    await testEmpTwo.save();
  });

  it('should return all the data with "find" method', async () => {
    const employees = await Employee.find();
    //console.log(employees);
    const expectedLength = 2;
    expect(employees.length).to.be.equal(expectedLength);
  });

  it('should return a proper document by "name" with "findOne" method', async () => {
  const employees = await Employee.findOne({ firstName: 'Name #1', lastName: 'Name #1'});
  const expectedfirstName = 'Name #1';
  expect(employees.firstName).to.be.equal(expectedfirstName);
  expect(employees.lastName).to.be.equal(expectedfirstName);
});

after(async () => {
  await Employee.deleteMany();
});
});

describe('Creating data', () => {
  it('should insert new document with "insertOne" method', async () => {
    const testEmpOne = new Employee({ firstName: 'Name #2', lastName: 'Name #2', department: 5 });
    await testEmpOne.save();
    expect(testEmpOne.isNew).to.be.false;
  });
  //usuwamy dokument po testach
  after(async () => {
  await Employee.deleteMany();
});
});

describe('Updating data', () => {
  before(async () => {
  const testEmpOne = new Employee({ firstName: 'Name #1', lastName: 'Name #1', department: '1' });
  await testEmpOne.save();
  const testEmpTwo = new Employee({firstName: 'Name #2', lastName: 'Name #2', department: '2' });
  await testEmpTwo.save();
  console.log(await Employee.find());
});

  it('should properly update one document with "updateOne" method', async () => {
    await Employee.updateOne({ lastName: 'Name #1' }, { $set: {lastName: 'Name #1=' }});
    const updatedEmployee = await Employee.findOne({ lastName: 'Name #1=' });
    expect(updatedEmployee).to.not.be.null;
    console.log(await Employee.find());
  });

  it('should properly update one document with "save" method', async () => {
    const findemp = await Employee.findOne({ lastName: 'Name #1=' });
    findemp.lastName = 'Name #1';
    await findemp.save();

    const updatedDepartment = await Employee.findOne({ lastName: 'Name #1' });
    expect(updatedDepartment).to.not.be.null;

  });

  it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const updatedEmployees = await Employee.find({ firstName: 'Updated!' });
      expect(updatedEmployees.length).to.be.equal(2);
  console.log(await Employee.find());
  });

/*afterEach(async () => {
  await Employee.deleteMany();
});*/

});


describe('Removing data', () => {
  beforeEach(async () => {
    const testEmpOne = new Employee({ firstName: 'Name #1', lastName: 'Name #1', department: '4'});
    await testEmpOne.save();
    const testEmpTwo = new Employee({firstName: 'Name #2', lastName: 'Name #2', department: '3' });
    await testEmpTwo.save();
});

  it('should properly remove one document with "deleteOne" method', async () => {
    await Employee.deleteOne({ firstName: 'Name #1' });
    const removeDepartment = await Employee.findOne({ firstName: 'Name #1' });
    expect(removeDepartment).to.be.null;

  });

  it('should properly remove one document with "remove" method', async () => {
    const department = await Employee.findOne({ firstName: 'Name #2' });
    await department.remove();
    const removedDepartment = await Employee.findOne({firstName: 'Name #2' });
    expect(removedDepartment).to.be.null;

  });

  it('should properly remove multiple documents with "deleteMany" method', async () => {
    await Employee.deleteMany();
    const departments = await Employee.find();
    expect(departments.length).to.be.equal(0);

  });

  afterEach(async () => {
    await Employee.deleteMany();
  });

});


});
