import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface ISysNotifyMaster extends BaseModel {
    Id: number;
    Title: string;
    Content: string;
    CreateDate: string;
    ModifiedDate: string | null;
    CreateBy: number;
    NotifyIcon: string;
    Disabled: boolean;
}