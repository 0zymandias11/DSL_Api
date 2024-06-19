const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    rule:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Rule',RuleSchema);