import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface INotifyForStudent extends BaseModel{
    Id: number;
    Title: string;
    Content: string;
    CreateDate: string;
    CreateFrom: string;
    ModifiedDate: string | null;
    CreateBy: number;
    CreateByName: string;
    Type: number;
    NotifyIcon: string;
    IsRead: boolean;
}