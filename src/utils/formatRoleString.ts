export const formatRoleString = (role: string): string => {
    const prefix = 'ROLE_';
    let result = role.startsWith(prefix) ? role.substring(prefix.length) : role;

    result = result
        .toLowerCase()
        .split('_')
        .map((word, index) => {
            if (index === 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
}