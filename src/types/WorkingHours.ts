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
    id: string,
    dayInWeek: DayInWeek,
    shift: Shift,
    openingTime: Date,
    closingTime: Date,
    status: boolean,
    branchId: Branch['id']
}