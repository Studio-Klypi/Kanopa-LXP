import { List, Nullable } from "../../objects/object.js";

enum Language {
  French = "fr",
  English = "en",
  German = "de",
  Spanish = "en",
  Japanese = "ja",
}
enum Theme {
  System = "system",
  Light = "light",
  Dark = "dark",
}
enum NotificationChannel {
  Push = "push",
  Email = "email",
}

export interface UserPreference {
  lang: Language;
  theme: Theme;
  timezone: string;
  notificationsEnabled: boolean;
  notificationChannels: List<NotificationChannel>;
  showEmail: boolean;
  showPhone: boolean;
  showLinkedin: boolean;
  updatedAt: Date;
}

export interface UserName {
  first: string;
  last: string;
  full: string;
  initials: string;
}

export interface User {
  id: string;
  name: UserName;
  phone: Nullable<string>;
  email: string;
  linkedin: Nullable<string>;
  active: boolean;
  emailVerifiedAt: Nullable<Date>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;

  preferences: UserPreference;
}
