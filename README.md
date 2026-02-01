# Relationship Website Mobile V2

A fun and interactive mobile website built with **React, Vite, Tailwind CSS, and Express.js** as seen on social media

&nbsp;

---
## 🚀 Installation

&nbsp;


### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rheinatamara/relationship_website_v2.git
cd relationship_website_v2
```

&nbsp;


### 2️⃣ Install Dependencies

1. Ensure you have **[Node.js](https://nodejs.org/)** installed.
2. Open 2 terminals and run the following commands: 

&nbsp;

terminal 1:

```bash
cd client
npm install
npm run dev
```

terminal 2:

```bash
cd server
npm install
npm run dev
```

&nbsp;

### 3️⃣ Access the Application

Open your browser and navigate to **[http://localhost:5173/](http://localhost:5173/)** to view the application.

- If you can't draw on the canvas please inspect the browser tab and set the dimensions to any mobile view.

&nbsp;



# 🎨 Making the Page Personal to You


&nbsp;



### **1. FRONTEND SIDE**

This project allows **full customization** through the `config.js` file.

&nbsp;


### **1️⃣ Editing Text & Titles**

All customizable text (titles, messages, prompts) is in `config/config.js`. **You can edit the following:**

- Quiz questions and answers
- Canvas colors or settings

Simply **open `config/config.js`** and edit the values.

&nbsp;


### **2️⃣ Adding Personal Pictures or Gifs**

To add your own gifs/images, place them in **`src/assets/`** directory.

📌 **Quiz Gifs** (used in the Quiz page):

- Location: `src/assets/gifs`
- Naming format: `gif1.png`, `gif2.png`, `gif3.png`, etc.

&nbsp;

**🖌️ Styling**

This project utilizes **[Tailwind CSS](https://tailwindcss.com/)** for styling.

- You can modify styles in `tailwind.config.js`
- Add or remove Tailwind classes in `.jsx` files

&nbsp;

---
&nbsp;


### **2. BACKEND SIDE (for Nodemailer)**
&nbsp;
### **1️⃣ Setting Up Environment Variables**

- Navigate to your **[Google Security Settings](https://myaccount.google.com/security)** page.
- Enable 2-Step Verification if it’s not already enabled.

&nbsp;
### **2️⃣ Generate an App Password**

- After enabling 2-Step Verification, proceed to the **[App Passwords](https://myaccount.google.com/u/3/apppasswords)** section.
- Generate an App Password for the application.

&nbsp;
### **3️⃣ Configure .env File**




- Rename the `.env.example` file in the server directory to `.env`
- Open the **.env** file and add your Gmail credentials:

```js
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=your-port
```

- Replace `your-email@gmail.com` with your Gmail address, `your-app-password` with the app password you generated and `your-port` with your development port

&nbsp;


### **4️⃣ Configure Nodemailer**

- go to `app.js` in your server folder
- Change the `to` field in the `mailOptions` object to the email address where you want to receive the files. **For example:**

```js
let mailOptions = {
  from: process.env.EMAIL_USER,
  to: "your-email@gmail.com", // change this to your email
  subject: "Drawings and letter for you",
  text: `${message}\n\n${score}`,
  attachments: attachments,
};
```
&nbsp;


## **Important notes:**

- Ensure that your `.env` file contains the correct `EMAIL_USER` and `EMAIL_PASS` (App Password) for the sender email.
- If you’re using Gmail, ensure you’ve enabled **2-Step Verification** and generated an **App Password** as described in the Backend Setup section.
- You If you have configured everything, ensure email is sent to your email address!

&nbsp;


---
## 🚀 **Deployment**



To deploy this project, you’ll need to deploy both the **client (frontend)** and **server (backend)** separately. Below are the general steps:

&nbsp;
### **1️⃣ Deploy the Client (Frontend)**

The frontend is built with Vite and can be deployed using platforms like **[Vercel](https://vercel.com/)** or **[Netlify](https://www.netlify.com/)**.

- Ensure your entire project (including the client and server folders) is pushed to a GitHub repository.
- Ensure your updated codes are being pushed to github if you're using Automatic Deployment (From GitHub)
- Sign up for Vercel or Netlify.
- Connect your GitHub repository to the platform.
- During the setup, specify the `client` folder as the root directory for the frontend.
- Follow the deployment steps (usually automatic).
- Your frontend will be live at a provided URL.

&nbsp;

**For detailed instructions, refer to the official Vite deployment guide:**

👉 [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html)



---
&nbsp;

### **2️⃣ Deploy the Server (Backend)**

The backend is built with Express.js and can be deployed using platforms like **[Render](https://render.com/)** or **[Railway](https://railway.com/)**.

- Ensure your entire project (including the client and server folders) is pushed to a GitHub repository.
- Ensure your updated codes are being pushed to github if you're using Automatic Deployment (From GitHub)
- Sign up for Render or Railway.
- Connect your GitHub repository to the platform.
- During the setup, specify the `server` folder as the root directory for the backend.
- Add your environment variables (from `.env`) in the platform’s settings.
- Follow the deployment steps.
- Your backend will be live at a provided URL.

&nbsp;

**For detailed instructions, refer to the official Express.js deployment guide:**

👉 [Express.js Deployment Guide](https://expressjs.com/en/advanced/best-practice-performance.html#deployment)

---

&nbsp;

### **3️⃣ Update the API Configuration**
- Before deploying the server, ensure that you change the cors origin to your frontend domain.

```js
app.use(cors({ origin: "https://your-frontend-domain-example" })); //change this to your deployed frontend domain
```

- After deploying the server, update the `baseURL` in the `config.js` file to point to your live backend URL. For example:

```js
api: {
  baseURL: "https://your-backend-url.com", // Replace with your live backend URL
  sendEmailEndpoint: "/send-email",
},
```
And **re-deploy** your frontend / backend as needed after your changes

&nbsp;

---
&nbsp;


## 📜 **Project Summary and Setup Guide**

### **Customization**

1. Everything is customizeable, modify the project in `config/config.js` in the frontend directory.

2. Ensure the `baseUrl` in the config matches your development port.

3. Verify that all `.env` variables are correctly configured and point to the intended resources

5. Test features during development **(e.g., Nodemailer should work even in development mode)**

### **Deployment**

1. Since the `frontend` and `backend` are in the same repository, you’ll need to specify the correct folder **(client or server)** during deployment.

2. Deploy the backend first and confirm that it's running before updating the `baseUrl` in the frontend configuration

3. After deployment, thoroughly test all features and re-deploy as necessary to resolve any issues.

&nbsp;

For any questions, **open an issue** on the repository❤️



---
&nbsp;
## **Live Demo**

👉 [Relationship Website V2 Demo](https://testing-beryl-nine.vercel.app/)
