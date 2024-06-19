const Rule = require('../models/Rules');

const createRules = async(req, res)=>{
    try{
        const newRule =  new Rule({
            user: req.user.id,
            rule: req.body.rule,
        });

        const rule = await newRule.save();
        res.json(rule);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const getRules = async(req, res)=>{
    try{
        const rules = await Rule.find({user: req.user.id});
        res.json({rules: rules});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");        
    }
};

const updateRules = async(req, res)=>{
    const {rule} = req.body;
    try{
        let updatedRule = await Rule.find({_id: req.params.id});
        if(!updatedRule)
            res.status(404).json({msg: "Rule not found !"});
        
        if(updatedRule.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not Authorized"});
        }

        updatedRule = await Rule.findById(req.params.id, 
            {$set: {rule: rule}},
            {new: true}
        );

        res.json(updatedRule);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const deleteRules = async(req, res)=>{
    try{
        const rule = await Rule.findById({_id: req.params.id});
        if(!rule)
            res.status(401).json({msg: "Rule not found !"});
        if(rule.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Action not Authorized !"});
        }

        await Rule.findByIdAndDelete(req.params.id);

        res.status(201).json({msg: "Rule Deleted !!"});

    }catch(err){
        console.log(err.message);
        res.send("Server Error");
    }
}

const getUser = async(req, res)=>{
    try{
        res.status(201).json({user_id: req.user.id})
    }catch(err){
        console.log(err);
        res.status(401).json({msg: "Invalid user authenticated"});
    }
}


module.exports = {getRules,
                    createRules,
                    updateRules,
                    deleteRules,
                getUser};