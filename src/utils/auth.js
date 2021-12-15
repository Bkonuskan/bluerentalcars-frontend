export const isAdmin = (roles) => {
    return roles && roles.includes("Administrator");
}