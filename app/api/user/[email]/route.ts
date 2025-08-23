import { connectToDB } from "@/lib/mongoDB";
import User from "@/models/User";
import { connect } from "http2";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
    try{
        await connectToDB();

        const {email} = params;

        const user = await User.findOne({email: email})

        if(!user){
            return new Response("User not found")

        }
        return new Response(JSON.stringify(user), {status: 200})
        

    } catch (err: any) {
        console.log(err);
        throw new Error(`Failed to get user: ${err.message}`);
    }
}