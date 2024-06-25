const sinon = require('sinon');
const { createRules } = require('../../controller/rulesController');
const {classifyData} = require('../../services/classificationEngine');
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

  it('should create a rule 1 successfully', async () => {
    const { expect } = await import('chai');
    sinon.stub(Rule.prototype, 'save').resolves();

    await createRules(req, res, next);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.called).to.be.true;
  });  
});

describe('Classification Engine',   () => {

    const rules = [
        { rule: "IF temperature >= 30 and temperature <= 60 THEN category = 'warm'" },
        { rule: "IF temperature < 30 THEN category = 'cold'" },
        { rule: "IF temperature >30 and temperature <50 and cloudy = false THEN category = 'dry heat'" },
        { rule: "IF cloudy = true THEN category = 'rain'" },
        { rule: "IF temperature > 30 and temperature < 50 and cloudy = true THEN category = 'humid'" },
    ];

    it('should classify as warm for temperature: 30', async () => {
        const { expect } = await import('chai');
        const data = { temperature: 30 };
        const category = await classifyData(data, rules);
        // console.log(category);
        expect(category).to.equal('warm');
    });

    it('should classify as unknown for temperature: 61', async () => {
        const { expect } = await import('chai');

        const data = { temperature: 61 };
        const category = await classifyData(data, rules);
        expect(category).to.equal('unknown');
    });

    it('should classify as unknown for cloudy: false without temperature', async () => {
        const { expect } = await import('chai');

        const data = { cloudy: false };
        const category = await classifyData(data, rules);
        expect(category).to.equal('unknown');
    });

    it('should classify as humid for temperature: 35 and cloudy: true', async () => {
        const { expect } = await import('chai');

        const data = { "temperature": 35, "cloudy": true };
        const category = await classifyData(data, rules);
        expect(category).to.equal('humid');
    });

    it('should classify as rain for cloudy: true', async () => {
        const { expect } = await import('chai');

        const data = { cloudy: true };
        const category = await classifyData(data, rules);
        expect(category).to.equal('rain');
    });

    it('should classify as dry heat for temperature: 40 and cloudy: false', async () => {
        const { expect } = await import('chai');

        const data = { temperature: 40, cloudy: false };
        const category = await classifyData(data, rules);
        expect(category).to.equal('dry heat');
    });

    // Additional tests for edge cases can be added here
});
