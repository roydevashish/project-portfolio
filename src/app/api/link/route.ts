import DBConnect from "@/lib/DB";
import LinkModel from "@/models/Link.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if(!userId) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized: Login is required."
    }, {status: 401});
  }

  const currentuser = await currentUser();
  const id = currentuser?.privateMetadata.id;
  const {title, link} = await req.json();
  
  try {
    await DBConnect();

    const newLink = new LinkModel({
      title,
      link,
      userId: id
    });

    await newLink.save();

    return NextResponse.json({
      success: true,
      message: "Link saved successfully."
    }, {status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Unable to save the link."
    }, {status: 500});
  } 
}