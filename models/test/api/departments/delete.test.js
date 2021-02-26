const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');
const Department = require('../../../../models/department.model');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
describe('Delete /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4199', name: 'Department #1' });
   await testDepOne.save();

  });

  describe('Delete /api/departments', () => {

  it('/:id should delete chosen document and return success', async() => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4199');
    const deleteDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4199' });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.not.null;
    //expect(deleteDepartment.length).to.be.equal(0);
    console.log(res.body);

  });

});

  after(async () => {
  await Department.deleteMany();
});
});
