# HỆ THỐNG SOẠN THẢO ĐỀ THI CHO TRƯỜNG THPT CHI LĂNG
Xây dựng hệ thống soạn đề thi tự động, giúp cho giáo viên có thể chủ động hơn trong việc xây dựng đề thi một cách công bằng và hiệu quả

## Công nghệ sử dụng
Backend: C# .NET Core.vfd
Frontend: Angular 11 (Template by Metronic).
Database: PostgreSQL.

## Yêu cầu cài đặt
- Visual Studio có môi trường .NET 5 (https://visualstudio.microsoft.com/) - Đề xuất tải bản Community.
- Node (https://nodejs.org/en/) - Đề xuất tải bản LTS.
- Angular (https://angular.io/guide/setup-local) - Tải Node trước mới có thể cài đặt Angular.
- PostgreSQL (https://www.postgresql.org/), nhớ đặt password là 'admin' cho tiện, tiện sao thì lát nói :))
- Có thể sử dụng Visual Studio Code hoặc editor khác tùy thích.
## Hướng dẫn chạy chương trình
1. PostgreSQL/PgAdmin
- Mở ứng dụng pgAdmin lên, điền mật khẩu để truy cập (mật khẩu là 'admin' nãy kêu đặt)
- Tại mục Servers/PostgreSQL xx/Databases (xx là số phiên bản), click chuột phải chọn Create > Database...
- Ở General/Database gõ tên là `Exam_Database`, sau đó bấm Save.
- Sau khi tạo xong, click chuột phải vào Database vừa tạo, chọn Restore.
- Ở General/Filename, chọn đến tệp BackupFull.sql nằm trong thpt-chi-lang/PostgreSQL_Scrip/ sau đó nhấn Select.
- Nhấn Restore, đợi thông báo thành công thì ta đã tạo trong cơ sở dữ liệu vả dữ liệu có sẵn.
2. Thư mục APICore_SoanDeThi
- Tìm đến APICore_SoanDeThi/appsettings.json, ở Connectb                  điền thông tin như sau:
+ User Id: cứ để nguyên là postgre, vì khi cài đặt nó là account mặc định
+ 
4. Thư mục Angular_Client
- Tại thpt-chi-lang/Angular_Client, trên đường dẫn thư mục gõ cmd để mở Command Prompt.
- Gõ `npm install` để tải về các packpage cần thiết.


