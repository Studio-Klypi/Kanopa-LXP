import { User } from "./user.js";
import { Nullable } from "../../objects/object.js";

enum DevicePlatform {
  Desktop = "desktop",
  Tablet = "tablet",
  Mobile = "mobile",
}
enum DeviceOs {
  MacOs = "macOS",
  IOs = "iOs",
  Android = "android",
  Windows = "windows",
  Linux = "linux",
  ChromeOs = "chromeOs",
  Other = "other",
}

export interface Device {
  id: string;
  agent: string;
  browser: Nullable<string>;
  platform: Nullable<DevicePlatform>;
  os: Nullable<DeviceOs>;
  firstSeenAt: Date;
  lastSeenAt: Date;

  user: User;
}
