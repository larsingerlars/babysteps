import { BDAYS } from "@/constants";

export function isBirthdayToday(birthday: Date, today: Date): boolean {
  return (
    birthday.getMonth() === today.getMonth() &&
    birthday.getDate() === today.getDate()
  );
}

export function hasBirthdayToday(today: Date = new Date()): boolean {
  return BDAYS.some((birthday) => isBirthdayToday(birthday, today));
}
