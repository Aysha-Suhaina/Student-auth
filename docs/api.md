{ i have to add specificarions about the project in readme.md 
details include :
- installing required dependencies
- creating required environment variables
- command to run 
- other project spec
- any other things i possibly forgot 
- add those too after remembering !  }



# API CREATED 

* http://localhost:4000/api/auth/register 

### method type - **POST**

### required fields in the body 
-name
-email
-password

#### sample JSON :
{
    "name":"Eren Yeager",
    "email":"yeagerist139@gmail.com",
    "password":"freedom"
}

**Test - Done**

--------------------------------

* http://localhost:4000/api/auth/login 

### method type - **POST**

### required fields in the body 
-email
-password

if already registered , just enter the credentials - if not you have to register a user first , then only you can login. 

#### sample JSON :

{
    "email":"yeagerist139@gmail.com",
    "password":"freedom"
}

**Test - Done**


--------------------------------

* http://localhost:4000/api/auth/login 

### method type - **POST**

### required fields in the body 
-email
-password

if already registered , just enter the credentials - if not you have to register a user first , then only you can login. 

#### sample JSON :

{
    "email":"yeagerist139@gmail.com",
    "password":"freedom"
}

**Test - Done**

-----------------------------------
* http://localhost:4000/api/auth/send-reset-otp


### method type - **POST**

### required fields in the body

-email

sample JSON :

{
"email":"aysha@gmail.com"
}


This API generates a 6-digit OTP and sends it to the registered email. The OTP is stored in the database with an expiry time

**Test - Done**
-------------------------------
* http://localhost:4000/api/auth/reset-password

### method type - **POST**
### required fields in the body

-email
-otp
-newPassword

sample JSON :

{
"email":"aysha@gmail.com",
"otp":"123456",
"newPassword":"newpass123"
}

----------------------------------------

