const ENVIRONMENTS = {
    LOCAL: "http://localhost:8000",
    QA:"",
    PRODUCTION: "",
}

const CURRENT_ENV = process.env.REACT_APP_ENVIRONMENT || "LOCAL";

export const BASE_URL = ENVIRONMENTS[CURRENT_ENV];