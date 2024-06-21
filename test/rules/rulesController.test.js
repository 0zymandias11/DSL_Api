const sinon = require('sinon');
const { createRules } = require('../../controller/rulesController');
const Rule = require('../../models/Rules');

describe('Rule Creation', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        rule: "IF temperature > 30 THEN category = 'hot'"
      },
      user: {
        id: 'userId'
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

  it('should create a rule successfully', async () => {
    const { expect } = await import('chai');
    sinon.stub(Rule.prototype, 'save').resolves();

    await createRules(req, res, next);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.called).to.be.true;
  });

//   it('should handle server error', async () => {
//     const { expect } = await import('chai');
//     sinon.stub(Rule.prototype, 'save').throws(new Error('Server Error'));

//     await createRules(req, res, next);

//     expect(res.status.calledWith(500)).to.be.true;
//     expect(res.send.calledWith('Server Error')).to.be.true;
//   });

});
