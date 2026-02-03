import { Schema, model } from "mongoose";

export const ROLES = ["admin", "user", "moderator"] as const;
export type Role = (typeof ROLES)[number];

export interface UserDocument {
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ROLES,
      default: "user"
    }
  },
  { timestamps: true }
);

export const User = model<UserDocument>("User", userSchema);

export function isRole(value: string): value is Role {
  return ROLES.includes(value as Role);
}
