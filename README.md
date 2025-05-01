


# 📦 Expense Tracker API  
A GraphQL API for managing expenses with session-based authentication and PostgreSQL as the database.

---

## 🔧 Features
- **User Management**: Register, login, update profile, delete user
- **Secure Authentication**: Passport.js with session-based auth (stored in PostgreSQL)
- **Transaction Management**: Create/read/update/delete transactions with user association
- **GraphQL API**: Full schema with type validation
- **Session Persistence**: PostgreSQL-backed session store

---

## 🛠 Technologies Used
- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database ORM**: [TypeORM](https://typeorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [Passport.js](http://www.passportjs.org/) with session strategy
- **GraphQL**: [Apollo Server](https://www.apollographql.com/)
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## 📦 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1. Create PostgreSQL database:
   ```sql
   CREATE DATABASE expense_tracker;
   ```

2. Create session table:
   ```sql
   CREATE TABLE "session" (
     "sid" varchar NOT NULL COLLATE "default",
     "sess" json NOT NULL,
     "expire" timestamp(6) NOT NULL
   ) WITH (OIDS=FALSE);
   ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
   CREATE INDEX "IDX_session_expire" ON "session" ("expire");
   ```

3. Configure `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=expense_tracker
   SESSION_SECRET=your-secret-key
   PORT=3000
   ```

### 4. Run Application
```bash
npm run start
```

---

## 📚 API Documentation

### 🧑 User Operations
#### 1. Register User
```graphql
mutation {
  register(input: {
    username: "john_doe",
    name: "John Doe",
    password: "securepassword",
    gender: "male"
  }) {
    id
    username
    profilePicture
  }
}
```

#### 2. Login
```graphql
mutation {
  login(loginUserInput: {
    username: "john_doe",
    password: "securepassword"
  }) {
    user {
      id
      username
    }
    message
  }
}
```

#### 3. Get Profile (Requires Auth)
```graphql
query {
  getProfile {
    id
    username
    name
    transactions {
      id
      description
      amount
    }
  }
}
```

---

### 💰 Transaction Operations
#### 1. Create Transaction
```graphql
mutation {
  createTransaction(createTransactionInput: {
    description: "Grocery shopping",
    paymentType: "debit",
    category: "Food",
    amount: 50,
    date: "2023-10-01T12:00:00Z"
  }) {
    id
    description
    amount
  }
}
```

#### 2. Get All Transactions
```graphql
query {
  transactions {
    id
    description
    amount
    user {
      username
    }
  }
}
```

#### 3. Get Transaction by ID
```graphql
query {
  transaction(id: 1) {
    id
    description
    amount
    date
  }
}
```

---

## 🔐 Authentication Flow
1. **Login** to get session cookie:
   - Session stored in PostgreSQL `session` table
   - Cookie automatically included in browser requests
2. **Authenticated Requests**:
   - Use `@Auth()` decorator on resolvers
   - Access current user via `@CurrentUser()` decorator

---

## 🧪 Example Authentication Test Flow
1. **Login**:
   ```graphql
   mutation {
     login(loginUserInput: { 
       username: "john_doe", 
       password: "securepassword" 
     }) {
       user { id username }
       message
     }
   }
   ```
   > Save the `connect.sid` cookie from response headers

2. **Get Profile**:
   ```graphql
   query {
     getProfile {
       id
       username
       transactions { id amount }
     }
   }
   ```
   > Include the cookie in request headers:
   ```
   Cookie: connect.sid=s%3Aabc123...
   ```

---

## 📁 Project Structure
```
src/
├── user/
│   ├── entities/ - User entity with transactions relation
│   ├── dto/ - Data transfer objects
│   └── user.service.ts - User business logic
├── transaction/
│   ├── entities/ - Transaction entity with user relation
│   ├── dto/ - Transaction data models
│   └── transaction.service.ts - Transaction operations
├── auth/
│   ├── strategies/ - Passport local strategy
│   ├── guards/ - Authentication guards
│   ├── serializer/ - Session serialization
│   └── auth.resolver.ts - Login/logout endpoints
└── main.ts - Session config and middleware setup
```

---

## 🧪 Testing
### With GraphQL Playground
1. Open `http://localhost:3000/graphql`
2. Use the provided mutations/queries
3. Cookies will be handled automatically in browser

---

## 🧩 Key Implementations
### Session Management
```typescript
// src/main.ts
app.use(
  session({
    store: new PgSessionStore({ pool, tableName: 'session' }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
  })
);
```

### Transaction Authorization
```typescript
// src/transaction/transaction.service.ts
async findOne(userid: number, id: number) {
  const transaction = await this.transactionRepo.findOne({ ... });
  if (transaction.user.id !== userid) {
    throw new Error('Unauthorized access');
  }
  return transaction;
}
```





