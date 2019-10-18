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
        //student的id没改过，所以默认是objectID
        {type: mongoose.Schema.Types.ObjectId, ref:'Student'}
    ]
},
{
    timestamps:true,
    //用了这个会有virtual ID
    toJSON:{
        virtuals:true
    },
    id :false
}
);
//virtual 的 field ,database里面没有，code和ID一样
schema.virtual('code').get(function() {
    return this._id;
})

const Model = mongoose.model('Course',schema);

module.exports = Model;