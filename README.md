# S Vote

Ứng dụng tạo poll ẩn danh, cho phép chia sẻ link bỏ phiếu và link xem kết quả theo token.

## 1) Chức năng chính

- Tạo poll với nhiều lựa chọn.
- Chia sẻ link bỏ phiếu cho người dùng.
- Bỏ phiếu ẩn danh (không cần đăng nhập).
- Hỗ trợ poll có mật khẩu (xác thực trước khi vote).
- Xem kết quả qua link token riêng.
- Cập nhật kết quả theo chu kỳ refresh.

## 2) Công nghệ chính

- Next.js App Router + TypeScript (strict mode)
- React 19
- Supabase (Database + Auth key + Edge Functions)
- Tailwind CSS 4
- Vitest + Testing Library

## 3) Ảnh minh hoạ

### Trang chủ

<img width="1304" height="757" alt="Image" src="https://github.com/user-attachments/assets/79427fec-0578-4de8-a1dc-ed6b3b8fcc8e" />

<img width="1280" height="672" alt="Image" src="https://github.com/user-attachments/assets/251f3cf3-b915-40c2-9b30-b14cdc55371c" />

<img width="1288" height="816" alt="Image" src="https://github.com/user-attachments/assets/31f06c8c-839b-43e0-943c-f27916671485" />

### Màn tạo poll

<img width="884" height="904" alt="Image" src="https://github.com/user-attachments/assets/9cfe5ddc-5c12-421b-b846-50fec3930b94" />

<img width="883" height="501" alt="Image" src="https://github.com/user-attachments/assets/58500077-f750-46f3-b665-9c4ca627f19b" />

### Màn bỏ phiếu

<img width="881" height="875" alt="Image" src="https://github.com/user-attachments/assets/c6eabbf6-f093-4237-8751-a6788d4fd83a" />


### Màn kết quả theo token


<img width="955" height="683" alt="Image" src="https://github.com/user-attachments/assets/b6db761a-7710-4a1e-85e2-cc477f755dc1" />

## 4) Yêu cầu trước khi chạy local

Đảm bảo máy đã cài:

- Node.js 20+ (khuyến nghị LTS)
- npm 10+
- Docker Desktop (hoặc Docker Engine + Docker Compose)
- Supabase CLI

Kiểm tra nhanh:

```bash
node -v
npm -v
docker -v
docker compose version
supabase -v
```

## 5) Hướng dẫn chạy local step-by-step

### Bước 1: Cài dependencies

```bash
npm install
```

### Bước 2: Tạo file env local

```bash
cp .env.example .env.local
```

### Bước 3: Khởi động Supabase local

```bash
supabase start
```

### Bước 4: Lấy thông tin local từ Supabase

```bash
supabase status
```

Ghi lại các giá trị quan trọng:

- API URL
- anon key
- service_role key

### Bước 5: Cập nhật `.env.local`

Mẫu tối thiểu để chạy local:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<local-service-role-key>
APP_URL=http://localhost:3000
LOG_LEVEL=info
```

> Lưu ý bảo mật: `SUPABASE_SERVICE_ROLE_KEY` chỉ dùng cho local/dev, không commit lên git.

### Bước 6: Reset DB và apply migrations local

```bash
npm run supabase:db:reset:local
```

### Bước 7: Chạy Edge Function local (terminal riêng)

```bash
supabase functions serve admin-task --no-verify-jwt
```

### Bước 8: Chạy ứng dụng Next.js (terminal riêng)

```bash
npm run dev
```

Mở trình duyệt tại:

- App: `http://localhost:3000`

### Bước 9: Chạy test

```bash
npm run test
```

Nếu cần chạy full quality gate local:

```bash
npm run ci:check
```

## 6) Luồng kiểm thử thủ công nhanh

1. Vào `http://localhost:3000`.
2. Tạo poll mới tại `/votes/create`.
3. Copy link vote và link results sau khi tạo thành công.
4. Mở link vote, thực hiện bỏ phiếu.
5. Mở link results để kiểm tra kết quả cập nhật.
6. Với poll có mật khẩu: xác thực mật khẩu trước khi vote.

## 7) Lệnh local thường dùng

```bash
npm run dev
npm run test
npm run typecheck
npm run lint
npm run supabase:db:reset:local
supabase functions serve admin-task --no-verify-jwt
supabase stop
```

## 8) Troubleshooting nhanh

- Lỗi thiếu biến môi trường: kiểm tra lại `.env.local` và restart `npm run dev`.
- Lỗi kết nối Supabase local: chạy lại `supabase status`, đảm bảo Docker đang chạy.
- Lỗi dữ liệu không đúng schema: chạy lại `npm run supabase:db:reset:local`.
- Lỗi API admin-task: kiểm tra terminal đang chạy `supabase functions serve admin-task --no-verify-jwt`.
