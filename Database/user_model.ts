import {model,models,Document,Schema} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document{
  name:string,
  email:string,
  password:string,
}

const UserSchema=new Schema<IUser>({
  name:{
    type:String,
    required:[true, 'Name is required'],
    trim:true,
  },
  email:{
    type:String,
    required:[true,'Email is required'],
    unique:true,
    trim:true,
    lowercase:true,
  },
  password:{
    type:String,
    required:[true,'Password is required'],
    minlength:[6,'Password must be atleast 6 characters'],
  },
},{timestamps:true})



UserSchema.pre('save', async function() {
  if(!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
})
const User=models.User||model<IUser>('User',UserSchema)
export default User;