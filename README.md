# js-dev-test

 ### Chương trình của em hoàn toàn có thể khởi chạy thành công, nếu có bất kì lỗi phát sinh nào khi khởi chạy, xin công ty hãy cho em biết. Em sẽ khắc phục ngay lập tức
 
  Sđt/zalo: 0395091462

  email: tien998@gmail.com

  Vũ Minh Tiến
  

 ### Thông tin phiên bản:
    fastify: last version
    nodeJS: 18.16.0
    Nextjs (React) được đặt trong thư mục `Book_app_NextJS` như một submodule của git respo
    @elastic/elasticsearch: 8.8.1

 ### Khởi chạy:

   ### Node:

   NextJS được đặt trong dự án như một submodule, để clone dự án chứa cả NextJS, xin hãy chạy lệnh sau:

    git clone --recurse-submodules  https://github.com/tien998/js-dev-test

   Để Fastify có thể khởi chạy thành công không bị lỗi kết nối elastic, xin hãy thay đổi thông tin kết nối đến Elastic Server phù hợp với máy chủ đang chạy tại `services/elasticService.js` các dòng 4:8 

    Chạy lệnh`node app.js` khởi chạy chương trình
    
   API được truy cập qua `http://localhost:3001/book`

   Thêm dữ liệu mẫu bằng cách truy cập `http://localhost:3001/seedDocs` hoặc chạy lệnh `node axios/seedDocs.js` 

   ### React:

   Để đảm bảo NextJS chạy có thể khởi chạy đúng, xin hãy đảm bảo fastify và elastic đã khởi chạy
   
   Vào thư mục `Book_app_NextJS` thực thi các lệnh sau:

     npm install
     npm run build
     npm run start

   NextJS khởi chạy và lắng nghe ở `http://localhost:3000/`

   Chọn cuốn sách muốn xem chi tiết trong danh sách sách và có thể viết bình luận

   Bình luận sách sử dụng socket.io để gửi và hiển thị bình luận theo thời gian thực

   Nội dung bình luận tạm thời được lưu vào 1 mảng trên Fastify, em sẽ tiếp tục cập nhật thêm tính năng cho bình luận lưu ở Elastics

 ### Kiểm thử bằng Axios:
   Trong thư mục dự án, có thể dùng Axios để kiểm thử API bằng các lệnh sau, xem kết quả trả về ở terminal

    `node axios/getall.js ` Lấy toàn bộ dữ liệu
    `node axios/get.js ` Lấy dữ liệu dựa trên 1 id cụ thể, có thể chỉnh sửa tham số id trong `axios/get.js`
    `node axios/put.js ` Sửa tài liệu dựa trên id cụ thể, có thể chính sửa id và giá trị trong tại liệu trong `axios/put.js`
    `node axios/post.js ` Tạo tài liệu mới trên Elastic có thể chỉnh sửa giá trị tài liệu trong `axios/post.js`
    
 ### Giải thích NodeJS:
   API được định tuyến (Routing) tại file 'app.js'gồm các phương thức GET, PUT, POST. 

   Các lệnh thao tác và thông tin kết nối với Elastic được đặt trong `services/elasticService.js` và được gọi bởi các phương thức trong `app.js`

   Dữ liệu được xác thực tính hợp lệ bằng JSON Schema trước khi POST hoặc PUT lên server được cấu hình tại dòng 7 file `app.js` như sau:
    
    const validateSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                author: { type: 'string' },
                publishedDate: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' }
            }
        }
      } 
    }

 ### 
    

