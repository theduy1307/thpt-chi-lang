import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface AccountInformation extends BaseModel {
    Id: number;
    HoLot: string;
    Ten: string;
    Username: string;
    Birthday: string;
    SoDienThoai:string;
    Email:string;
    ClassName: string | null;
    ManageClass: string;
    Department: string | null;
    AllowCode: number;
    IsStudent:boolean;
    Gender:number;
}

export const EMPTY_DATA_ACCOUNT_INFORMATION:AccountInformation = {
    id:undefined, status:undefined, data:undefined,
    Id: undefined,
    HoLot: "",
    Ten: "",
    Username: "",
    Birthday: "",
    SoDienThoai:"",
    Email:"",
    ClassName: "",
    ManageClass: "",
    Department: "",
    AllowCode: undefined,
    IsStudent:undefined,
    Gender: undefined,
}

export interface PasswordChangeInformation {
    OldPassword:string;
    NewPassword:string;
}