import mongoose, { ConnectOptions } from "mongoose";
import * as dns from "dns";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS;

if (!uri) {
  console.error("Atlas URI Not Found Dummy");
  process.exit(1);
}

export default async function ConnAtlas() {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        console.log(uri);

        await mongoose.connect(uri, {
            family: 4,
            serverSelectionTimeoutMS: 5000
        } as ConnectOptions);

        await mongoose.connection.db.admin().command({ ping: 1 });

        console.log("NOICE");
    } catch (err) {
        console.error(err);
        throw err;
    }
}