import { Document, Types } from "mongoose";

export interface Features extends Document {
  title: string;
  image: string;
  icon: string;
  description: string;

}


