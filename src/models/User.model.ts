import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string,
  username: string,
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email."]
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    match: [/^[A-Za-z0-9_]+$/, "Please use a valid username."]
  }
}, { timestamps: true });

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
export default UserModel;