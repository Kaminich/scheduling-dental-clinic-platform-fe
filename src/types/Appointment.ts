import Branch from "./Branch";
import Customer from "./Customer";
import Dentist from "./Dentist";
import Service from "./Service";
import Slot from "./Slot";

enum Status {
    Pending = "Pending",
    Done = "Done",
    Cancel = "Cancel"
}

export default interface Appointment {
    id: number,
    customerName: string,
    customerAddress: string,
    customerPhoneNumber: string,
    customerDOB: Date,
    customerAge: number,
    customerEmail: string,
    location: string,
    status: Status,
    slotId: Slot["id"],
    branchClinicId: Branch["id"],
    customerId: Customer["id"],
    dentistId: Dentist['id'],
    serviceId: Service['id']
}