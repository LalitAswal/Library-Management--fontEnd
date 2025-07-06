

const ENVIRONMENTS = {
    LOCAL: "http://localhost:8000",
    QA:"",
    PRODUCTION: "https://library-management-i7nc.onrender.com",
}

const CURRENT_ENV = process.env.REACT_APP_ENVIRONMENT || "LOCAL";
console.log('BASE_URL = ENVIRONMENTS[CURRENT_ENV]', ENVIRONMENTS[CURRENT_ENV])
console.log(' CURRENT_ENV',CURRENT_ENV)
export const BASE_URL = ENVIRONMENTS[CURRENT_ENV];