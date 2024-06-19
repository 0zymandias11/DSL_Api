/**
 * Function to classify incoming data based on user-defined rules
 * @param {Object} data - The incoming data to be classified
 * @param {Array} rules - The user-defined classification rules
 * @returns {String} - The category assigned to the data
 */
const classifyData = (data, rules) => {
    for (let rule of rules){
        console.log(`data ${JSON.stringify(data)}\n`);
        const parsedRule = parseRule(rule.rule);
        if(parsedRule.condition(data)){
            console.log(`category: ${parsedRule.category}`)  // Corrected to parsedRule.condition(data)
            return parsedRule.category;
        }
    }

    return 'unknown';  // Corrected typo from 'unkown' to 'unknown'
}

/**
 * Function to parse a user-defined rule
 * @param {String} rule - The rule in DSL format
 * @returns {Object} - The parsed rule with condition function and category
 */
const parseRule = (rule) => {
    const conditionMatch = rule.match(/IF (.+) THEN category = '(.+)'/);  // Corrected regex
    if (!conditionMatch) {
        throw new Error('Invalid Rule Format');
    }

    const conditionString = conditionMatch[1];
    const category = conditionMatch[2];
    
    console.log(`conditionString: ${conditionString}\ncategory: ${category}\n`);

    const condition = new Function('data', `return data.${conditionString}`);  // Access property via data object
    return {condition, category};
}

module.exports = {classifyData};
