export const formatRoleString = (role: string): string => {
    // Check if the role starts with 'ROLE_' and remove it
    const prefix = 'ROLE_';
    let result = role.startsWith(prefix) ? role.substring(prefix.length) : role;

    // Convert the resulting string to camelCase
    result = result
        .toLowerCase() // Convert the entire string to lowercase
        .split('_') // Split the string by underscores
        .map((word, index) => {
            if (index === 0) {
                return word; // The first word should be in lowercase
            }
            // Capitalize the first letter of each subsequent word
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(''); // Join the words back together

    // Capitalize the first letter of the camelCase string
    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
}