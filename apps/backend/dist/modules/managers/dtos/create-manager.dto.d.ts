export declare enum ManagerRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER"
}
export declare class CreateManagerDto {
    name: string;
    email: string;
    password: string;
    role: ManagerRole;
}
