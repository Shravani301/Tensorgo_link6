const mongoose=require('mongoose');
const organizationSchema=new mongoose.Schema({
    orgName:{type:String},
    adminId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},

});
const organization=mongoose.model('Organization',organizationSchema);
module.exports=organization;