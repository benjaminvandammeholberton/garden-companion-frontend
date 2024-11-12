export const ROOTURL = process.env.REACT_APP_BACKEND_URL || "https://jammin-dev.com/" + "api/v1/"

const backendRoutes = {
    register: ROOTURL + "auth/users/",
    login: ROOTURL + "auth/jwt/create/",
    activate: ROOTURL + "auth/users/activation/",
    verifyToken: ROOTURL + "auth/jwt/verify/",
    todos: ROOTURL + "todos/",
    areas: ROOTURL + "areas/",
    seedlings: ROOTURL + "seedlings/",
    operations: ROOTURL + "operations/",
    // SEEDLING

}

export default backendRoutes

