# Task Management API

## Giới thiệu

- Đây là API cho hệ thống quản lý công việc nhà

## Công nghệ sử dụng

- Server: NestJS
- Database: MySQL
- Caching: Redis

## Chạy ứng dụng

- Lưu ý: trước khi chạy, hãy đảm bảo tắt hết các dịch vụ (service) đang chạy trên cổng các cổng sau:
  - 8080
  - 3306 (MySQL)
  - 6379 (Redis)
- Đảm bảo máy tính đã cài Docker
- Di chuyển vào thư mục project và gõ lệnh:

```bash
docker-compose up --build -d
```

- Để dừng ứng dụng, chạy lệnh:

```bash
docker-compose down
```
