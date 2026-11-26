DE TAI: HE THONG DAT DO AN CHO SINH VIEN TRONG KY TUC XA
BAN: WEBSITE JAVA OOP (KHONG CAN SPRING BOOT / MYSQL)

1. YEU CAU
- JDK 17 hoac moi hon
- Visual Studio Code + Extension Pack for Java (hoac Terminal)
- Chrome / Edge / Firefox

2. CACH CHAY TRONG VS CODE
- Giai nen ZIP.
- Mo ca thu muc DatDoAnKTX_Web_Java bang VS Code.
- Mo Terminal tai dung thu muc goc (noi co src va web).
- Windows PowerShell:
  .\CHAY_WINDOWS.ps1
  (Hoac mo file Main.java va nhan Run trong VS Code, dam bao thu muc lam viec la project goc)
- Mac/Linux:
  ./CHAY_MAC_LINUX.sh
- Mo trinh duyet: http://localhost:8080
- Neu cong 8080 dang duoc su dung: java -cp out main.Main 9090 (mo http://localhost:9090)
- Neu thay trang bi loi 404, hay kiem tra Terminal dang o thu muc goc project.
- Nhan Ctrl+C de dung.

3. CAU TRUC
src/model       : User, Student, Food, Cart, CartItem, Order, OrderDetail
src/service     : FoodService, OrderService, PaymentMethod, WalletPayment, CashPayment, BankTransferPayment
src/repository  : FileRepository (luu don hang vao file data/orders.txt)
src/utils       : Validation, IdGenerator
src/main        : Main, AppContext, WebServer
web             : index.html, style.css, app.js (giao dien trinh duyet)

4. THU CHUC NANG
- Danh sach mon: 5 mon. Mon Tra sua M04 mac dinh het hang.
- Tim mon bang o tim kiem, loc mon bang nhom.
- Them mon, tang/giam so luong, xoa mon.
- Gio hang rong khong cho dat.
- Vi sinh vien co 200.000 VND (mau) khi khoi dong; vi thieu tien khong cho thanh toan.
- Tien mat va chuyen khoan la mo phong: don cho thanh toan/xac nhan, khong ket noi ngan hang.
- Sau khi dat, mo Don hang cua toi de xem trong bo nho.
- Don hang duoc ghi vao data/orders.txt bang File IO.

5. OOP THEO DE BAI
- Dong goi: private fields + getter/setter
- Ke thua/truu tuong: Student extends abstract User
- Da hinh/interface: PaymentMethod, WalletPayment, CashPayment, BankTransferPayment
- Collections: List, ArrayList
- Exception: try/catch + IllegalArgumentException
- File IO: FileRepository

6. LUU Y
- Day la website mo phong CHAY TREN MAY CUA BAN, KHONG PHAI WEBSITE ONLINE CONG KHAI.
- Du lieu tai khoan va gio hang la DU LIEU MAU mot nguoi dung; khong co dang nhap/xac thuc.
- Don hang trong file duoc luu, nhung lich su tren giao dien chi hien thi trong lan chay hien tai.
- So du vi khoi tao lai khi chay chuong trinh; chua co luu so du.
- Khi demo, de tranh trung ma/du lieu, dung mot cua so trinh duyet.
- Java backend khong thay doi cac quy tac nghiep vu chi de lam giao dien.
