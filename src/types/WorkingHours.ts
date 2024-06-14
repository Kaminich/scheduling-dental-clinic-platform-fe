import Branch from "./Branch";

enum DayInWeek {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}

enum Shift {
    Morning = "Morning",
    Afternoon = "Afternoon",
    AllDay = "AllDay",
}

export default interface WorkingHours {
    id: number,
    dayInWeek: DayInWeek,
    shift: Shift,
    openingTime: string,
    closingTime: string,
    status: boolean,
    branchId: Branch['id']
}