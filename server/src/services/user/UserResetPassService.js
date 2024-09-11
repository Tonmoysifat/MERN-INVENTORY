
const UserResetPassService = async (req, userModel,otpsModel) => {
   try{
       const email = req.body["email"];
       const otp = req.body["otp"];
       let updateStatus = "Used"
       const newPass = req.body["NewPassword"];
       const confirmPass = req.body["ConfirmPassword"];
       if (newPass === confirmPass) {
           let data = await otpsModel.aggregate([{$match:{email:email,otp:otp,status:updateStatus}},{$count:"total"}])

           if (data.length > 0) {
               await userModel.updateOne({email: email}, {password: newPass});
               return {
                   status: "Success",
                   message: "Password reset successfully done",
               };
           } else {
               return {status: "Fail", message: "No user"};
           }

       } else {
           return {
               status: "Fail",
               message: "New password and Confirm password should be same",
           };
       }
   }
   catch (e) {
       return {status: "Fail", data: e.toString()}
   }
}
module.exports = UserResetPassService