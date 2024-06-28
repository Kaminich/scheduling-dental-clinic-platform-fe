export enum Status {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
}

export enum DayInWeek {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export enum Shift {
    MORNING = "MORNING",
    AFTERNOON = "AFTERNOON",
    ALL_DAY = "ALLDAY",
}

export enum ReportReason {
    SPAM = 'Spam',
    INAPPROPRIATE_CONTENT = 'Inappropriate content',
    ABUSIVE_BEHAVIOR = 'Abusive behavior',
    FALSE_INFORMATION = 'False information',
    HARASSMENT = 'Harassment',
    DISCRIMINATION = 'Discrimination',
    VIOLATION_OF_TERMS = 'Violation of term'
}
