export const PERMISSIONS = {
    // Role
    CREATE_ROLE: "role.create",
    GET_ROLES: "role.get",
    GET_ROLE_BY_ID: "role.get.by.id",
    UPDATE_ROLE: "role.update",
    DELETE_ROLE: "role.delete",

    // Permission
    CREATE_PERMISSION: "permission.create",
    GET_PERMISSIONS: "permission.get",
    GET_PERMISSION_BY_ID: "permission.get.by.id",
    UPDATE_PERMISSION: "permission.update",
    DELETE_PERMISSION: "permission.delete",

    // Role Permission
    CREATE_ROLE_PERMISSION: "role.permission.create",
    GET_ROLE_PERMISSIONS: "role.permission.get",
    GET_ROLE_PERMISSION_BY_ID: "role.permission.get.by.id",
    GET_ROLE_PERMISSION_BY_ROLE_ID: "role.permission.get.by.role.id",
    GET_ROLE_PERMISSION_BY_PERMISSION_ID: "role.permission.get.by.permission.id",
    UPDATE_ROLE_PERMISSION: "role.permission.update",
    DELETE_ROLE_PERMISSION: "role.permission.delete",

    // User
    CREATE_USER: "user.create",
    GET_USERS: "user.get",
    GET_USER_BY_ID: "user.get.by.id",
    UPDATE_USER: "user.update",
    DELETE_USER: "user.delete",
    BAN_USER: "user.ban",
    UNBAN_USER: "user.unban",
    CHANGE_USER_ROLE: "user.change.role",

    // Event
    CREATE_EVENT: "event.create",
    GET_EVENTS: "event.get",
    GET_EVENT_BY_ID: "event.get.by.id",
    UPDATE_EVENT: "event.update",
    DELETE_EVENT: "event.delete",
    APPROVE_CREATE_EVENT: "event.approve.create",
    REJECT_CREATE_EVENT: "event.reject.create",
    APPROVE_UPDATE_EVENT: "event.approve.update",
    REJECT_UPDATE_EVENT: "event.reject.update",

    // School
    CREATE_SCHOOL: "school.create",
    GET_SCHOOLS: "school.get",
    GET_SCHOOL_BY_ID: "school.get.by.id",
    UPDATE_SCHOOL: "school.update",
    DELETE_SCHOOL: "school.delete",

    // Department
    CREATE_DEPARTMENT: "department.create",
    GET_DEPARTMENTS: "department.get",
    GET_DEPARTMENT_BY_ID: "department.get.by.id",
    UPDATE_DEPARTMENT: "department.update",
    DELETE_DEPARTMENT: "department.delete",

    // Council
    CREATE_COUNCIL: "council.create",
    GET_COUNCILS: "council.get",
    GET_COUNCIL_BY_ID: "council.get.by.id",
    UPDATE_COUNCIL: "council.update",
    DELETE_COUNCIL: "council.delete",

    // Article
    CREATE_ARTICLE: "article.create",
    GET_ARTICLES: "article.get",
    GET_ARTICLE_BY_ID: "article.get.by.id",
    UPDATE_ARTICLE: "article.update",
    DELETE_ARTICLE: "article.delete",

    // Send Mail
    SEND_MAIL: "send.mail",

    // Email Templates
    CREATE_EMAIL_TEMPLATE: "email.template.create",
    GET_EMAIL_TEMPLATES: "email.template.get",
    GET_EMAIL_TEMPLATE_BY_ID: "email.template.get.by.id",
    UPDATE_EMAIL_TEMPLATE: "email.template.update",
    DELETE_EMAIL_TEMPLATE: "email.template.delete",

    // Bulk Emails
    CREATE_BULK_EMAIL: "bulk.email.create",
    GET_BULK_EMAILS: "bulk.email.get",
    GET_BULK_EMAIL_BY_ID: "bulk.email.get.by.id",
    CONFIRM_BULK_EMAIL: "bulk.email.confirm",
    CANCEL_BULK_EMAIL: "bulk.email.cancel",
    DELETE_BULK_EMAIL: "bulk.email.delete",

    // Activity Log
    VIEW_ACTIVITY_LOG: "activity.log.view",
    DELETE_ACTIVITY_LOG: "activity.log.delete",

    // Update User Request
    GET_UPDATE_USER_REQUESTS: "update.user.request.get",
    UPDATE_UPDATE_USER_REQUEST: "update.user.request.update",


    // Sidebar items permission
    SIDEBAR_VIEW_EVENTS: "sidebar.events.view",
    SIDEBAR_VIEW_USER_REGISTRATIONS: "sidebar.user.registrations.view",
    SIDEBAR_VIEW_ROLES_AND_PERMISSIONS: "sidebar.roles.and.permissions.view",
    SIDEBAR_VIEW_UPDATE_USER_REQUESTS: "sidebar.update.user.request.view",
    SIDEBAR_VIEW_SCHOOLS: "sidebar.schools.view",
    SIDEBAR_VIEW_DEPARTMENTS: "sidebar.departments.view",
    SIDEBAR_VIEW_USERS: "sidebar.users.view",
    SIDEBAR_VIEW_ARTICLES: "sidebar.articles.view",
    SIDEBAR_VIEW_EMAIL: "sidebar.email.view",
};