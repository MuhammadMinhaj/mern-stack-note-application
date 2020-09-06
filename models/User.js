const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        maxLength:16
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    phone:{
        type:String,
        trim:true,
        required:true 
    },
    password:{
        type:String,
        trim:true,
        required:true 
    },
    gender:{
        type:String,
        trim:true,
        required:true 
    },
    country:{
        type:String,
        trim:true,
        required:true 
    },
    birthday:{
        type:Date,
        trim:true,
        required:true 
    },
})

const User = new model('User',schema)

module.exports = User 