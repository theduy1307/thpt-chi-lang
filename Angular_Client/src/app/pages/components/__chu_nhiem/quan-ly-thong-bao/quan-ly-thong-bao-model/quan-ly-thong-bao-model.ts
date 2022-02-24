import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface ISysNotifyMaster extends BaseModel {
    Id: number;
    Title: string;
    Content: string;
    CreateDate: string;
    ModifiedDate: string | null;
    CreateBy: number;
    Type:number; //1: Giáo viên bộ môn, 2: Quản trị, 3: Giáo viên CN
    NotifyIcon: string;
    Disabled: boolean;
}