# MERN Authentication System

## Abstract
This project is a full-stack authentication system built using the MERN stack (MongoDB, Express, React, Node.js). It supports user registration, login, JWT-based authentication, and password reset via OTP using email services. The system ensures secure data handling and a responsive frontend interface.

---

## Tech Stack

### Frontend
- React
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Nodemailer

### Dev Tools
- Nodemon

--------
## Installation

### Clone Repository
```bash
git clone <repo-url>
cd <repo-name>```


###Install frotend 

```cd client
npm install
npm install axios react-router-dom```


---

###Install Backend
```cd server
npm install
npm install express cors dotenv nodemon jsonwebtoken mongoose bcryptjs nodemailer```

---

###Environment Variables

Create a .env file inside server/:


```MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SMTP_USER=your_username
SMTP_KEY=your_key
SENDER_MAIL=your_mail```

---

##Database

if using local mongodb server 
make sure you have mongodb server locally installed 

open cmd and enter 
```mongod```

this will run the mongodb server locally

then on .env your mongo_uri shoyld be ```mongodb://localhost:27017/studentDB"```

##Run Application
###Start Backend
```cd server
npm run dev```


###Start Frontend
```cd client
npm run dev```





