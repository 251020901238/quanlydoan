package main;

public class Main {
    public static void main(String[] args) {
        try {
            int port = args.length > 0 ? Integer.parseInt(args[0]) : 8080;
            WebServer server = new WebServer(new AppContext(), port);
            server.start();
            System.out.println("Website da chay: http://localhost:" + port);
            System.out.println("Mo trinh duyet va nhap dia chi tren.");
            System.out.println("Nhan Ctrl + C de dung.");
        } catch (Exception e) {
            System.out.println("Loi khoi dong: " + e.getMessage());
        }
    }
}
