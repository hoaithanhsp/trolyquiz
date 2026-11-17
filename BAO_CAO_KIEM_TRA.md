# BÁO CÁO KIỂM TRA

## 1. Tóm tắt
Đã rà soát và sửa các lỗi quan trọng liên quan đến cấu hình API key, model mặc định, cơ chế fallback model, xử lý lỗi API và rủi ro lộ bí mật trong repo `hoaithanhsp/trolyquiz`.

## 2. Lỗi đã phát hiện và sửa

### 2.1. Validator API key
- **Trước:** validator chỉ có thể gây hiểu nhầm về định dạng; yêu cầu cần hỗ trợ cả `AIzaSy` và `AQ`.
- **Đã sửa:** chuẩn hóa regex thành `^(?:AIzaSy|AQ)\S{8,}$` trong `services/googleAiConfig.ts`.

### 2.2. Model mặc định và danh sách fallback
- **Trước:** model mặc định chưa đúng theo yêu cầu; chuỗi fallback còn chứa model không đúng/không còn phù hợp.
- **Đã sửa:**
  - Default model đổi sang `gemini-3.8-flash`.
  - Cập nhật fallback đúng thứ tự:
    `gemini-3.8-flash → gemini-3.7-flash → gemini-3.5-flash-lite → gemini-3.6-flash → gemini-3.5-flash → gemini-3.1-flash-lite → gemini-2.5-flash`
  - Loại bỏ các model shutdown/không cần thiết khỏi danh sách hiển thị.

### 2.3. Xử lý lỗi 502/503/504 và 429
- **Trước:** xử lý lỗi chưa tách đúng giữa lỗi quá tải model và lỗi quota/key.
- **Đã sửa:**
  - 502/503/504 được xem là lỗi tạm thời để fallback model.
  - 429 chỉ trả về trạng thái quota/cooldown, không đánh dấu API key invalid.
  - `INVALID_API_KEY` chỉ áp dụng cho lỗi xác thực thực sự.

### 2.4. Cấu hình gemini-3*
- **Trước:** cấu hình generation còn truyền nhiệt độ/sampling cho mọi model.
- **Đã sửa:** với `gemini-3*`, không gửi `temperature/topP/topK`; chỉ dùng `thinkingConfig.thinkingLevel` hợp lệ.

### 2.5. Tránh lộ API key và cấu hình không an toàn
- **Trước:** `vite.config.ts` có `define` inject `process.env.GEMINI_API_KEY`, có nguy cơ đưa bí mật vào bundle frontend.
- **Đã sửa:** loại bỏ hoàn toàn phần define này khỏi `vite.config.ts`.

### 2.6. Cập nhật UI cấu hình model
- **Đã sửa:** `components/SettingsPage.tsx` hiển thị đúng danh sách model mới, mô tả fallback đúng thứ tự.

### 2.7. Cập nhật tải HTML từ thư viện
- **Đã sửa:** `components/LibraryPage.tsx` bổ sung nút “Tải lại” trong preview để nạp lại quiz từ thư viện; đồng thời giữ logic xuất HTML rõ ràng hơn.

## 3. Lỗi chưa sửa được
- Chưa thực hiện refactor sâu các template HTML/giao diện game vì phạm vi yêu cầu ưu tiên sửa lỗi runtime/bảo mật, tránh thay đổi lớn.
- Chưa tối ưu bundle size; build vẫn báo chunk lớn hơn ngưỡng 500kB nhưng không ảnh hưởng trực tiếp đến tính đúng đắn hiện tại.

## 4. Đề xuất cải thiện thêm
- Tách phần tạo HTML template thành module riêng để dễ kiểm thử và bảo trì.
- Thêm test cho hàm validate API key, thứ tự fallback model, và phân loại lỗi API.
- Giảm kích thước bundle bằng code splitting cho các trang `Library/Reports/Settings/Support`.
- Chuẩn hóa logic cache/localStorage và xử lý lỗi parse JSON từ model AI.

## 5. Checklist `api.md`
- [ ] Có tài liệu `api.md` trong repo
- [x] Validator API key chấp nhận cả `AIzaSy` và `AQ`
- [x] Default model là `gemini-3.8-flash`
- [x] Chuỗi fallback đúng yêu cầu
- [x] Loại bỏ model đã shutdown/không còn cần thiết
- [x] `gemini-3*` không gửi `temperature/topP/topK`
- [x] 502/503/504 kích hoạt fallback model
- [x] 429 chỉ cooldown, không đánh dấu invalid key
- [x] Không log API key ra console
