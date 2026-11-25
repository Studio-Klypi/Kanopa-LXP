import { Nullable, ObjectLiteral } from "../../objects/object.js";
import { User } from "../auth/user.js";

export enum LogType {
  LoginSucceeded = "loginSucceeded",
  LoginFailed = "loginFailed",
  Logout = "logout",
  SessionRevoked = "sessionRevoked",
  PasswordChanged = "passwordChanged",
  PasswordResetRequested = "passwordResetRequested",
  PasswordResetCompleted = "passwordResetCompleted",
  EmailVerified = "emailVerified",
  EmailChanged = "emailChanged",
  NewDeviceDetected = "newDeviceDetected",
}

export interface Log {
  id: string;
  type: LogType;
  ip: Nullable<string>;
  agent: Nullable<string>;
  meta: Nullable<ObjectLiteral>;
  createdAt: Date;

  user: Nullable<User>;
}
