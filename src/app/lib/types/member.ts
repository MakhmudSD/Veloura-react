import mongoose from "mongoose";
import { MemberStatus, MemberType } from "../enums/members.enum";
import { Session } from "express-session";

export interface Member {
  _id: mongoose.Types.ObjectId;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail?: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface MemberUpdateInput {
  _id: mongoose.Types.ObjectId | undefined;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string | undefined;
  memberEmail?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface AdminRequest extends Request {
  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

export interface ExtendedRequest extends Request {
  query: any;
  params: { id: any; };
  cookies: any;
  member: Member;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

