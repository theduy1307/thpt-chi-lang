import { HttpClient, HttpParams, HttpEvent } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpUtilsService } from "../../../../_global/_services/http-utils.service";

const API_ROOT_URL = environment.ApiRoot + "/common";
const API_WC_URL = environment.ApiRoot + "/dungchung";
const API_ROOT_URL_ITEMS = environment.ApiRoot + "/items";

@Injectable({
  providedIn: "root",
})
export class DungChungService {
  data_import: BehaviorSubject<any[]> = new BehaviorSubject([]);
  lastFileUpload$: BehaviorSubject<{}> = new BehaviorSubject({});
  lastFilterDSExcel$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  lastFilterInfoExcel$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}

  /*-----------------------------------------*/
  uploadFileImport(data): Observable<any> {
    const url = API_ROOT_URL_ITEMS + "/ImportFile";
    const httpHeaders = this.httpUtils.getHttpHeaders();
    return this.http.post<any>(url, data, { headers: httpHeaders });
  }
  // downloadTemplate(){
  // 	const url = API_ROOT_URL_ITEMS + '/DownLoadFileImportMau';
  // 	return url;
  // }
  createMultiple(item): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    return this.http.post<any>(API_ROOT_URL_ITEMS + "/Item_Mutiple_Insert", item, { headers: httpHeaders });
  }
  listType(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL_ITEMS + "/Type_List";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getCode(path: string): Observable<any> {
    const url = API_ROOT_URL + "/getCode";
    const parms = new HttpParams().set("path", path.toString());
    const httpHeaders = this.httpUtils.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeaders, params: parms });
  }
  getListDieuKhoan(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_DieuKhoan";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListLoaiHopDong(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_LoaiHopDongMua";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListMauHopDong(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_MauHopDongMua";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListDieuKhoanMau(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_DieuKhoanMauMua";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListBoPhanChiuTrachNhiem(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_BoPhanChiuTrachNhiem";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListHangHoa(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_HangHoa";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListTienTe(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_TienTe";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListNguoiChiuTrachNhiem(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_NhanVienChiuTrachNhiem";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListThongTinHopDong(id: number): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const parms = new HttpParams().set("id", id.toString());
    const url = API_ROOT_URL + "/GetList_ThongTinHopDong";
    return this.http.get<any>(url, { headers: httpHeaders, params: parms });
  }
  getListNhaCungCap(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_NhaCungCap";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListChuongMonHoc(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_ChuongMonHoc";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListBaiHoc(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_BaiHoc";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListBoMon(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_BoMon";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListNienKhoa(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_NienKhoa";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListChuNhiem(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_ChuNhiem";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  getListLopHoc(): Observable<any> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const url = API_ROOT_URL + "/GetList_LopHoc";
    return this.http.get<any>(url, { headers: httpHeaders });
  }
  downloadTemplate(Id: number): Observable<Blob> {
    const httpHeaders = this.httpUtils.getHttpHeaders();
    const httpParams = new HttpParams().set("Id", Id.toString());
    return this.http.get<Blob>(API_ROOT_URL + "/DownLoadFile", {
      headers: httpHeaders,
      params: httpParams,
      responseType: "blob" as "json",
    });
  }
}
