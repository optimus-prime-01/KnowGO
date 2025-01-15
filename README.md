
---

### **1. Set up your project in VS Code:**

a. Open VS Code and create a new folder for your project.

b. Initialize a new Node.js project by running this command:
```bash
npm init -y
```

---

### **2. Install required packages:**

Run this command to install the necessary packages:
```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors express-validator
```

---

### **3. Create a `.env` file:**

Create a `.env` file in the root folder and add the following:

```
PORT=3000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### **4. Update `package.json`:**

In `package.json`, change the "main" field to `server.js`.

Run the server using:
```bash
npx nodemon
```

---

### **API Endpoints using Postman:**

#### a. **Register User (POST):**

1. URL: `http://localhost:3000/users/register`
2. Body (raw JSON):

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "dob": "1990-01-01",
  "userType": "Customer",
  "contactNumber": 1234567890
}
```

---

#### b. **Login User (POST):**

1. URL: `http://localhost:3000/users/login`
2. Body (raw JSON):

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### c. **Create Order (POST):**

1. URL: `http://localhost:3000/users/order`
2. Headers: Add `Authorization` with `Bearer <token>` (replace `<token>` with the token from login).
3. Body (raw JSON):

```json
{
  "customerId": "<user_id>",
  "partnerId": "<partner_id>",
  "orderDetail": {
    "startLocation": "123 Start St",
    "endLocation": "456 End Ave",
    "category": "X",
    "description": "Test order",
    "situation": "Normal"
  },
  "status": "Ongoing"
}
```

---

#### d. **Get Order (GET):**

1. URL: `http://localhost:3000/users/order/<order_id>`
2. Headers: Add `Authorization` with `Bearer <token>`.

Replace `<order_id>` with an actual order ID.

---

#### e. **Add User Address (POST):**

1. URL: `http://localhost:3000/users/address`
2. Headers: Add `Authorization` with `Bearer <
