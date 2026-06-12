export const APP_CONFIG = {
  MAX_RETRY_ATTEMPTS: 3,
  TIMEOUT_MS: 5000
};

export const API_END_POINT = {
        API_LOGIN: "/Account/login",
        API_CLIENT_REGISTER:"/Client/register-client",
        API_SIGNUP :"/Account/Signup",
        COMPANY_DROPDOWN_DATA :"/Master/company-dropdown",
        GET_ALL_EMPLOYEE : "/Employee/search",
        GET_ALL_DEPARTMENT : "/Department/get",
        CREATE_DEPARTMENT : "/Department/create",
        GET_DEPARTMENT_BY_ID : "/Department",
        UPDATE_DEPARTMENT : "/Department",
        DELETE_DEPARTMENT : "/Department",

        // AI_Assistent
        UPLOAD_PDF : "/upload",
        CHAT_API : "/chat"
}


export const SESSION_STORAGE = {
  TOKEN:"TOKEN",
  CLIENT :"CLIENT",
  MENU : "MENU",
  ROLE : "ROLE",
  PERMISSIONS:"PERMISSIONS",
  USER : "USER"
}