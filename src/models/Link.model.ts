import mongoose, { Document, Schema } from "mongoose";

export interface Link extends Document {
  title: string,
  link: string,
  userId: string
}

const LinkSchema: Schema<Link> = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  link: {
    type: String,
    required: [true, "Link is required"],
    match: [/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/, "Please use a valid link."]
  },
  userId: {
    type: String,
    required: [true, "User id is required"]
  }
}, { timestamps: true });

const LinkModel = (mongoose.models.Link as mongoose.Model<Link>) || (mongoose.model<Link>("Link", LinkSchema));
export default LinkModel;