const sinon = require('sinon');
const { registerUser } = require('../../controller/registerUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

describe('User Registration', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should register a user successfully', async () => {
    const { expect } = await import('chai');
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(bcrypt, 'genSalt').resolves('salt');
    sinon.stub(bcrypt, 'hash').resolves('hashed_password');
    sinon.stub(User.prototype, 'save').resolves();
    sinon.stub(jwt, 'sign').yields(null, 'token');

    await registerUser(req, res, next);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ token: 'token' })).to.be.true;
  });

  it('should return error if user already exists', async () => {
    const { expect } = await import('chai');
    sinon.stub(User, 'findOne').resolves({});

    await registerUser(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ msg: 'User already Exists' })).to.be.true;
  });

  // Additional tests for error handling can be added here
});
