# 🩺 Diabetes Prediction Web Application# Diabetes Prediction Web Application



Ứng dụng web dự đoán bệnh tiểu đường sử dụng Machine Learning với giao diện thân thiện và API RESTful.Hệ thống dự đoán nguy cơ mắc bệnh tiểu đường sử dụng machine learning và web technologies.



## 🌟 Tính năng chính## 🏗️ Cấu trúc Project



- 🔐 **Xác thực người dùng**: Đăng ký, đăng nhập với email verification```

- 👥 **Phân quyền**: User, Doctor, Admin với các quyền hạn khác nhauWebsite-Diabetes Prediction/

- 📊 **Dự đoán AI**: Sử dụng 11+ thuật toán ML để dự đoán tiểu đường├── Backend/               # Node.js + TypeScript API

- 📈 **Quản lý dữ liệu sức khỏe**: Lưu trữ và theo dõi các chỉ số sức khỏe│   ├── src/

- 📱 **Responsive UI**: Giao diện thích ứng mọi thiết bị│   │   ├── configs/      # Cấu hình database, environment

- 🔔 **Thông báo**: Email notifications và realtime updates│   │   ├── controllers/  # API Controllers

│   │   ├── middlewares/  # Middleware functions

## 🛠️ Tech Stack│   │   ├── models/      # Database models

│   │   ├── routes/      # API routes

### Backend│   │   ├── services/    # Business logic

- **Runtime**: Node.js 18+│   │   ├── utils/       # Utility functions

- **Framework**: Express.js với TypeScript│   │   └── server.ts    # Entry point

- **Database**: MongoDB với Mongoose ODM│   ├── package.json

- **Authentication**: JWT + bcryptjs + express-session│   └── tsconfig.json

- **Email**: Nodemailer với Gmail SMTP└── Frontend/             # Next.js React Application (Sẽ được phát triển)

- **Security**: Helmet, CORS, rate limiting```



### Machine Learning## 🚀 Tính năng chính

- **Language**: Python 3.8+

- **Libraries**: scikit-learn, XGBoost, LightGBM, CatBoost### Backend API

- **Optimization**: Optuna hyperparameter tuning- **Quản lý người dùng**: Đăng ký, đăng nhập, xác thực email

- **Data Processing**: pandas, numpy, imbalanced-learn- **Dự đoán bệnh tiểu đường**: Sử dụng thuật toán ML để đánh giá nguy cơ

- **Visualization**: matplotlib, seaborn, plotly- **Lưu trữ lịch sử**: Theo dõi các lần dự đoán và dữ liệu sức khỏe

- **Hệ thống phân quyền**: User, Doctor, Admin roles

### Frontend (Coming Soon)- **API RESTful**: Comprehensive endpoints cho frontend

- **Framework**: Next.js 14 với TypeScript

- **Styling**: Tailwind CSS### ML Model Features

- **State Management**: Redux Toolkit- Phân tích 8 chỉ số sức khỏe chính:

- **Charts**: Chart.js / Recharts  - Số lần mang thai (cho phụ nữ)

  - Nồng độ glucose trong máu

## 📁 Cấu trúc Project  - Huyết áp

  - Độ dày da

```  - Nồng độ insulin

Website-Diabetes Prediction/  - BMI (Chỉ số khối cơ thể)

├── Backend/                 # API Server  - Diabetes Pedigree Function

│   ├── src/  - Tuổi

│   │   ├── controllers/     # Route handlers

│   │   ├── models/         # MongoDB schemas## 🛠️ Tech Stack

│   │   ├── services/       # Business logic

│   │   ├── routes/         # API routes### Backend

│   │   ├── middlewares/    # Auth, validation, error handling- **Node.js + TypeScript**: Runtime và ngôn ngữ

│   │   ├── utils/          # Helper functions- **Express.js**: Web framework

│   │   └── configs/        # Database, environment config- **MongoDB + Mongoose**: Database và ODM

│   ├── package.json- **bcryptjs**: Mã hóa mật khẩu

│   └── tsconfig.json- **nodemailer**: Gửi email xác thực

├── ML/                     # Machine Learning Pipeline- **express-session**: Quản lý session

│   ├── diabetes_ml_pipeline.py    # Main ML pipeline- **http-status-codes**: HTTP status constants

│   ├── notebooks/          # Jupyter notebooks for experiments

│   ├── data/              # Training datasets### Frontend (Sắp tới)

│   ├── models/            # Trained model files- **Next.js 14**: React framework với App Router

│   └── requirements.txt- **TypeScript**: Type safety

├── Frontend/              # Web UI (Coming Soon)- **Tailwind CSS**: Styling framework

└── README.md- **Chart.js**: Data visualization

```- **Axios**: HTTP client



## 🚀 Cài đặt và Chạy## ⚙️ Cài đặt và Chạy



### Prerequisites### Prerequisites

- Node.js 18+- Node.js (v18 trở lên)

- Python 3.8+- MongoDB (local hoặc cloud)

- MongoDB (local hoặc MongoDB Atlas)- npm hoặc yarn

- Git

### Backend Setup

### 1. Clone Repository

```bash1. **Clone repository**

git clone <repository-url>   ```bash

cd Website-Diabetes-Prediction   git clone <repository-url>

```   cd Website-Diabetes Prediction/Backend

   ```

### 2. Cài đặt Backend

```bash2. **Cài đặt dependencies**

cd Backend   ```bash

npm install   npm install

```   ```



Tạo file `.env` trong thư mục Backend:3. **Cấu hình environment**

```env   ```bash

PORT=8017   cp .env.example .env

MONGODB_URI=mongodb://localhost:27017/diabetes_prediction   ```

JWT_SECRET=your-super-secret-jwt-key   Chỉnh sửa file `.env` với thông tin của bạn:

JWT_EXPIRES_IN=7d   - MongoDB connection string

SESSION_SECRET=your-session-secret   - Email SMTP settings

EMAIL_USER=your-email@gmail.com   - JWT secret keys

EMAIL_PASS=your-app-password

NODE_ENV=development4. **Chạy development server**

```   ```bash

   npm run dev

### 3. Cài đặt ML Environment   ```

```bash

cd ML5. **Build cho production**

pip install -r requirements.txt   ```bash

```   npm run build

   npm start

### 4. Chạy Application   ```



#### Backend Development Server### API Endpoints

```bash

cd Backend#### Authentication (`/api/v1/auth`)

npm run dev     # Development với nodemon- `POST /register` - Đăng ký tài khoản mới

npm run build   # Build TypeScript- `POST /verify-email` - Xác thực email

npm start       # Production mode- `POST /login` - Đăng nhập

```- `POST /logout` - Đăng xuất

- `GET /profile` - Lấy thông tin profile

#### Train ML Models- `PUT /profile` - Cập nhật profile

```bash

cd ML#### Predictions (`/api/v1/predictions`)

python diabetes_ml_pipeline.py- `POST /` - Tạo dự đoán mới

- `GET /my-predictions` - Lấy lịch sử dự đoán của user

# Hoặc sử dụng Jupyter- `GET /statistics` - Thống kê dự đoán của user

jupyter notebook notebooks/diabetes_model_training.ipynb- `GET /:id` - Lấy chi tiết một dự đoán

```- `PUT /:id` - Cập nhật dự đoán (notes, review)

- `DELETE /:id` - Xóa dự đoán

## 📋 API Documentation

#### Admin/Doctor Routes

### Authentication Endpoints- `GET /predictions` - Xem tất cả dự đoán (Doctor/Admin only)

- `POST /api/v1/auth/register` - Đăng ký tài khoản mới- `GET /auth/users` - Quản lý người dùng (Admin only)

- `POST /api/v1/auth/login` - Đăng nhập

- `POST /api/v1/auth/logout` - Đăng xuất## 📊 Thuật toán Dự đoán

- `POST /api/v1/auth/verify-email` - Xác thực email

- `POST /api/v1/auth/forgot-password` - Quên mật khẩuHệ thống sử dụng một mô hình đơn giản hóa dựa trên:

- **Chuẩn hóa dữ liệu**: Scale tất cả features về [0,1]

### User Management- **Weighted scoring**: Từng chỉ số có trọng số khác nhau

- `GET /api/v1/users/profile` - Lấy thông tin profile- **Risk classification**: 

- `PUT /api/v1/users/profile` - Cập nhật profile  - Thấp (< 0.3): Nguy cơ thấp

- `DELETE /api/v1/users/profile` - Xóa tài khoản  - Trung bình (0.3-0.6): Cần theo dõi

  - Cao (> 0.6): Nên khám bác sĩ

### Prediction Endpoints

- `POST /api/v1/predictions` - Tạo dự đoán mới## 🔐 Bảo mật

- `GET /api/v1/predictions` - Lấy lịch sử dự đoán

- `GET /api/v1/predictions/:id` - Chi tiết dự đoán- **Password hashing**: bcrypt với salt rounds = 12

- `DELETE /api/v1/predictions/:id` - Xóa dự đoán- **Session-based auth**: Secure session cookies

- **Input validation**: Joi schema validation

### Admin Endpoints (Admin only)- **Rate limiting**: Sẽ được thêm trong tương lai

- `GET /api/v1/admin/users` - Quản lý người dùng- **CORS**: Configured cho frontend domain

- `GET /api/v1/admin/predictions/stats` - Thống kê dự đoán

## 📝 Logging và Monitoring

## 🤖 Machine Learning Models

- **Console logging**: Development và production logs

Pipeline sử dụng 11 thuật toán khác nhau:- **Error handling**: Centralized error middleware

- **Health check**: `/health` endpoint

1. **Logistic Regression** - Baseline model- **Database monitoring**: Connection status logging

2. **Random Forest** - Ensemble method

3. **XGBoost** - Gradient boosting## 🚧 Roadmap

4. **LightGBM** - Fast gradient boosting

5. **CatBoost** - Categorical boosting### Phase 1: Backend API (✅ Hoàn thành)

6. **Support Vector Machine** - Kernel methods- User authentication và authorization

7. **K-Nearest Neighbors** - Instance-based- Diabetes prediction engine

8. **Naive Bayes** - Probabilistic- RESTful API endpoints

9. **Decision Tree** - Interpretable model- Database design và models

10. **Extra Trees** - Randomized trees

11. **AdaBoost** - Adaptive boosting### Phase 2: Frontend Development (🔄 Tiếp theo)

- Next.js application setup

### Model Performance- User interface design

- **Cross-validation**: 5-fold stratified- Data visualization components

- **Metrics**: Accuracy, Precision, Recall, F1-score, AUC-ROC- Responsive design

- **Hyperparameter tuning**: Optuna optimization

- **Class balancing**: SMOTE/ADASYN cho imbalanced data### Phase 3: Advanced Features (📋 Kế hoạch)

- Advanced ML models (scikit-learn integration)

## 🔒 Security Features- Real-time notifications

- Export reports (PDF)

- ✅ Password hashing với bcrypt (12 salt rounds)- Multi-language support

- ✅ JWT token authentication- Mobile app (React Native)

- ✅ Session management

- ✅ Email verification## 🤝 Contributing

- ✅ Rate limiting

- ✅ CORS protection1. Fork project

- ✅ Helmet security headers2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)

- ✅ Input validation và sanitization3. Commit changes (`git commit -m 'Add some AmazingFeature'`)

- ✅ Error handling middleware4. Push to branch (`git push origin feature/AmazingFeature`)

5. Mở Pull Request

## 🧪 Testing

## 📄 License

```bash

# Unit testsDistributed under the MIT License. See `LICENSE` for more information.

npm run test

## 👥 Team

# Integration tests

npm run test:integration- **Backend Development**: Node.js + TypeScript API

- **Frontend Development**: Next.js React Application  

# Coverage report- **ML Integration**: Diabetes prediction algorithms

npm run test:coverage- **DevOps**: Deployment và monitoring

```

## 📊 Database Schema

### User
- `name`, `email`, `password`
- `role`: user | doctor | admin
- `isEmailVerified`, `emailVerificationToken`
- `createdAt`, `updatedAt`

### HealthData
- `userId` (ref: User)
- `pregnancies`, `glucose`, `bloodPressure`
- `skinThickness`, `insulin`, `bmi`
- `diabetesPedigreeFunction`, `age`
- `createdAt`

### PredictionResult
- `healthDataId` (ref: HealthData)
- `prediction`: 0 | 1 (No Diabetes | Diabetes)
- `probability`, `riskLevel`
- `modelUsed`, `recommendations`
- `createdAt`

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Authors

- **Joyce** - *Full Stack Developer* - [GitHub](https://github.com/joyce)

## 🙏 Acknowledgments

- Dataset: Pima Indians Diabetes Database
- ML Libraries: scikit-learn, XGBoost, LightGBM
- Backend Framework: Express.js
- Database: MongoDB

---

⭐ **Star repository nếu project hữu ích!** ⭐