import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    GoodHabitArticle:{type:String,bookRecommendation:{type:Array},videoRecommendation:{type:Array}},
    BadHabitArticle:{type:String,bookRecommendation:{type:Array},videoRecommendation:{type:Array}},
    SocialMediaArray:{type:String,bookRecommendation:{type:Array,videoRecommendation:{type:Array}}},
})