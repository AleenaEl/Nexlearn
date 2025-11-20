# NexLearn – Online MCQ Exam Platform  
A fully responsive and production-ready online examination platform built using **Next.js**, **Redux Toolkit**, **React Query**, **TailwindCSS**, and **JWT Authentication**.

This project was developed as part of a front-end machine test and includes real API integration, auto-submit exam timer, responsive UI, and state-managed workflows.

---

## 🚀 Features

### ✅ **Authentication**
- OTP-based login using real API  
- JWT access token  handling   
- Logout API implemented

---

### 🧪 **Exam Module**
- Fetches live questions from API  
- Displays MCQs with comprehension, images, and options  
- Tracks:
  - Answered  
  - Not Answered  
  - Marked for Review  
  - Visited Questions  

- Question Palette with color indicators  
- Auto-save answers  
- Fully responsive (mobile, tablet, desktop)

---

### ⏳ **Advanced Timer System**
- Starts when user begins the exam  
- Uses **localStorage + Redux** to persist time even if page is refreshed  
- Auto-submits the exam when time reaches **00:00**  
- Timer displayed inside QuestionPalette

---

### 📤 **Submit & Result**
- Submits answers as **FormData** to API  
- Receives exam score, correct answers, incorrect, not attended  
- Result page with summary and icons  
- State preserved using Redux

---

### 🎨 **UI/UX**
- Built using **TailwindCSS** + custom components  
- Pixel-perfect Figma implementation  
- Clean layout with semantic HTML  
- Accessible and keyboard friendly

---

### 🔍 **SEO Optimization**
- Added metadata, keywords, robots, favicon  
- Semantic HTML structure  
- Fast and optimized rendering

---

### ⚙️ **Tech Stack**
- Next.js 14 (App Router)
- React 18
- Redux Toolkit
- React Query (TanStack)
- Axios with interceptors
- TailwindCSS
- Lucide Icons
- react-hot-toast

---

## 📁 Folder Structure (Important)
src/
├─ app/
│ ├─ exam/
│ │ ├─ instructions/
│ │ ├─ test/
│ │ └─ result/
│ ├─ layout.js
│ └─ page.js
├─ components/
│ ├─ test/
│ │ ├─ QuestionBlock/
│ │ ├─ QuestionPalette/
│ │ └─ SubmitDialog/
│ ├─ Timer/
│ └─ Navbar/
├─ redux/
│ ├─ examSlice.js
│ ├─ examResultSlice.js
│ └─ ReduxProvider.js
├─ services/
│ └─ examServices.js
├─ providers/
│ └─ QueryProvider.js
├─ assets/
└─ utils/

## 📦 Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone <your-repository-url>
cd nexlearn
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Environment Variables
```bash
Create .env.local
NEXT_PUBLIC_API_URL="baseurl"
```
###4️⃣ Run project
```bash
npm run dev

📄 License

This project is created solely for assessment and educational purposes.
It is not intended for production use.
