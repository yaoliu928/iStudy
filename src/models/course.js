const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: {
        type: String,
        uppercase: true
    },
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        default:'',
        alias:'des'
    },
    __v:{
        type:String,
        select:false
    },
    students: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Student'}
    ]
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    id :false
}
);
schema.virtual('code').get(function() {
    return this._id;
})

const Model = mongoose.model('Course',schema);

module.exports = Model;