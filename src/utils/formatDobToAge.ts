/**
 * Takes a date of birth string and returns the age.
 * @param {string} dob - Date of birth in string format.
 * @returns {number} - The age calculated from the date of birth.
 */
export const formatDobToAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the birth month hasn't occurred yet this year or it's the birth month but the birth day hasn't occurred yet, subtract one from the age.
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
