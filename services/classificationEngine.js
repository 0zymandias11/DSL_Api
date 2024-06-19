
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
