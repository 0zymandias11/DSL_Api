/**
 * Function to classify incoming data based on user-defined rules
 * @param {Object} data - The incoming data to be classified
 * @param {Array} rules - The user-defined classification rules
 * @returns {String} - The category assigned to the data
 */
const classifyData = (data, rules) => {
    for (let rule of rules) {
        const parsedRule = parseRule(rule.rule);
        if (parsedRule.condition(data)) {
            return parsedRule.category;
        }
    }
    return 'unknown';
}

/**
 * Function to parse a user-defined rule
 * @param {String} rule - The rule in DSL format
 * @returns {Object} - The parsed rule with condition function and category
 */
const parseRule = (rule) => {
    const conditionMatch = rule.match(/IF (.+) THEN category = '(.+)'/);
    if (!conditionMatch) {
        throw new Error('Invalid Rule Format');
    }

    const conditionString = conditionMatch[1];
    const category = conditionMatch[2];

    // console.log(transformCondition(conditionString));
    const condition = new Function('data', `return ${transformCondition(conditionString)}`);
    return { condition, category };
}

/**
 * Function to transform condition strings to valid JavaScript expressions
 * @param {String} conditionString - The condition string from the rule
 * @returns {String} - Transformed condition string
 */
const transformCondition = (conditionString) => {
    // Replace 'and' with '&&' and 'or' with '||'
    conditionString = conditionString.replace(/\band\b/g, '&&').replace(/\bor\b/g, '||');

    // Replace variable names and values
    conditionString = conditionString.replace(/(\w+)\s*([><=!]+)\s*([\w+]+)/g, (match, p1, p2, p3) => {
  
        const left = `data.${p1}`;
        // const right = isNaN(p3) ? `data.${p3}` : p3;
        const right = p3;
        // console.log(`${left} ${right} ${p2='==='}`);
        return `${left} ${p2= '==='} ${right}`;
    });

    return conditionString;
}

module.exports = { classifyData };
