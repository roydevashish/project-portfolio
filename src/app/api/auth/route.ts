import { currentUser, auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DBConnect from '@/lib/DB';
import UserModel from '@/models/User.model';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser()
  const emailId = user?.emailAddresses[0].emailAddress;

  try {
    await DBConnect();

    let userByEmailId = await UserModel.findOne({"email": emailId});
    if(!userByEmailId) {
      const temp_username = uuidv4().replace(/-/g, '');

      const newUser = new UserModel({
        email: emailId,
        username: temp_username
      });

      userByEmailId = await newUser.save();
    }

    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        id: userByEmailId._id,
        email: userByEmailId.email,
        username: userByEmailId.username
      },
    })
  } catch(error) {
    console.log(error);
  }

  redirect("/dashboard");
}