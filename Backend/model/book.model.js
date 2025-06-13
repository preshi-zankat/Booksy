import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    auther:{
        type:String
    },
    description: String,
    genre:{ 
        type:String
    },
    like:{
        type:Number,
        default:0
    },
    image:{
        type:String
    },
    featured:{
        type:Boolean,
        default:false
    }
})

const Book=mongoose.model('Book',bookSchema)
export default Book