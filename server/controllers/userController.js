import UserModel from '../models/user.js'

export const getUserData = async (req, res) => {
    try{
        const {userId} = req.body;

        const user = await UserModel.findById(userId)

        if(!user){
            res.json({ success: false, message: 'User not found'})
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        })

    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}