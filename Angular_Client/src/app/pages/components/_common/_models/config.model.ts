export class Config{
    /*page navigate config*/
    PAGE_SIZE_LIST: number[];
    PAGE_SIZE_DEFAULT: number = 10;

    /*ID type product */
    ID_HANGHOA_TP: number = 4;

    /*Config Code Phòng ban */
    PB_LAMVIEC_TAIXUONG: string = 'Config_PBMacDinhTaiXuong'

    /*Config Code công đoạn tại xưởng (28 công đoạn) */
    Config_CongDoanNgam: string = 'Config_CongDoanNgam'
    Config_CongDoanChan: string = 'Config_CongDoanChan'
    Config_CongDoanTron: string = 'Config_CongDoanTron'

    /*Status code send broker server */
    SUCCESSCODE: number = 200;
    FAILCODE: number = 404;

    /*Topic in broker server */
    NOTIFICATION: string = "notification";
    AUTHENTICATE: string = "authenticate";

    /*ID công đoạn */
    optionsInfoCongDoan: any = [
        {
            id: 1,
            name: 'Nhập nguyên liệu'
        },
        {
            id: 2,
            name: 'Sơ chế'
        },
        {
            id: 3,
            name: 'Rã đông'
        },
        {
            id: 4,
            name: 'Lựa'
        },
        {
            id: 5,
            name: 'Rửa nước'
        },
        {
            id: 6,
            name: 'Rửa Chlorine'
        },
        {
            id: 7,
            name: 'Cắt'
        },
        {
            id: 8,
            name: 'Chần'
        },
        {
            id: 9,
            name: 'Làm lạnh'
        },
        {
            id: 10,
            name: 'Để ráo'
        },
        {
            id: 11,
            name: 'Ly tâm'
        },
        {
            id: 12,
            name: 'Xay trộn'
        },
        {
            id: 13,
            name: 'Trộn'
        },
        {
            id: 14,
            name: 'Định hình'
        },
        {
            id: 15,
            name: 'Hấp'
        },
        {
            id: 16,
            name: 'Rang - Xào'
        },
        {
            id: 17,
            name: 'Nấu'
        },
        {
            id: 18,
            name: 'Ngâm'
        },
        {
            id: 19,
            name: 'Sấy AD'
        },
        {
            id: 20,
            name: 'Dàn khay'
        },
        {
            id: 21,
            name: 'Cấp đông'
        },
        {
            id: 22,
            name: 'Sấy FD'
        },
        {
            id: 23,
            name: 'Ra hàng'
        },
        {
            id: 24,
            name: 'Tiệt trùng'
        },
        {
            id: 25,
            name: 'Sàng'
        },
        {
            id: 26,
            name: 'Đánh'
        },
        {
            id: 27,
            name: 'Tách kim loại'
        },
        {
            id: 28,
            name: 'Dò kim loại'
        },
        {
            id: 29,
            name: 'Đóng gói'
        },
        {
            id: 30,
            name: 'In Date'
        },
        {
            id: 31,
            name: 'Đóng gói, dán nhãn'
        }
    ];
}