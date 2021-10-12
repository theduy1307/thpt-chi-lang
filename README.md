# HỆ THỐNG SOẠN THẢO ĐỀ THI CHO TRƯỜNG THPT CHI LĂNG (Đang cập nhật)
Xây dựng hệ thống soạn đề thi tự động, giúp cho giáo viên có thể chủ động hơn trong việc xây dựng đề thi một cách công bằng và hiệu quả

## Nội dung
1. [Công nghệ sử dụng](#technology)
2. [Yêu cầu cài đặt](#install-require)
3. [Thiết lập trước khi chạy chương trình](#pre-setup)
4. [Chạy chương trình](#run-project)

## Công nghệ sử dụng <a name="technology"></a>
- Backend: C# .NET Core.vfd
- Frontend: Angular 11 (Template by Metronic).
- Database: PostgreSQL.

## Yêu cầu cài đặt <a name="install-require"></a>
- [Visual Studio](https://visualstudio.microsoft.com/) có môi trường .NET 5 - Đề xuất tải bản Community.
- [Node](https://nodejs.org/en/) - Đề xuất tải bản LTS.
- [Angular](https://angular.io/guide/setup-local) - Tải Node trước mới có thể cài đặt Angular.
- [PostgreSQL](https://www.postgresql.org/)
- Có thể sử dụng [Visual Studio Code](https://code.visualstudio.com/) hoặc editor khác tùy thích.


## Thiết lập trước khi chạy chương trình <a name="pre-setup"></a>
### PostgreSQL/PgAdmin
- Mở ứng dụng pgAdmin lên, điền mật khẩu để truy cập
- Tại mục Servers/PostgreSQL xx/Databases (xx là số phiên bản), click chuột phải chọn Create > Database...
- Ở General/Database gõ tên là `Exam_Database`, sau đó bấm Save.
- Sau khi tạo xong, click chuột phải vào Database vừa tạo, chọn Restore.
- Ở General/Filename, chọn đến tệp BackupFull.sql nằm trong thpt-chi-lang/PostgreSQL_Scrip/ sau đó nhấn Select.
- Nhấn Restore, đợi thông báo thành công thì ta đã tạo trong cơ sở dữ liệu vả dữ liệu có sẵn.
### Thư mục APICore_SoanDeThi
- Tìm đến APICore_SoanDeThi/appsettings.json, tại ConnectionStrings
```javascript
"ConnectionStrings": {
    "PostgreConnection": "Server= 127.0.0.1; Port=5432; Database=Exam_Database; User Id=postgres; Password = admin; Integrated Security=true; Pooling=true;"
  }
```
Thông tin như sau:
+ Server: 127.0.0.1 là IP localhost của máy.
+ Port: port của postgreSQL, mặc định là 5432, nếu khi cài đặt có thay đổi thì đổi port cho phù hợp
+ User Id: cứ để nguyên là postgre, vì khi cài đặt nó là account mặc định
+ Password: là password để đăng nhập pgAdmin, thay đổi bằng mật khẩu của máy mình
### Thư mục Angular_Client
- Tại thpt-chi-lang/Angular_Client, trên đường dẫn thư mục gõ cmd để mở Command Prompt.
- Gõ `npm install` để tải về các packpage cần thiết.

## Chạy chương trình <a name="run-project"></a>
### Thư mục APICore_SoanDeThi
- Mở APICore_SoanDeThi bằng Visual Studio lên, sau đó nhấn `Ctrl + F5` hoặc chọn `Debug > Start withou debugging`.
### Thư mục Angular_Client
- Mở Angular_Client bằng Visual Studio Code, chọn `Terminal > New Terminal` để mở Command Line (nếu hiện rồi thì không cần). 
- Gõ `ng serve --o` để start project. Đợi khi trình duyệt mở tab có url là `localhost:4200` và màn hình đăng nhập thì Angular start thành công.
- Hiện tại chưa hoàn thiện chức năng đăng nhập nên cứ để default và nhấn Đăng nhập để vào trang.

