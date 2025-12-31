# 📮 Postman Collection for REST API

Complete Postman collection for testing the React Ecommerce REST API.

---

## 🚀 Quick Start

### **1. Generate Collection**

```bash
cd apps/server
pnpm postman:generate
```

This creates `rest-api-collection.json` with **30 endpoints** across **7 categories**.

### **2. Import in Postman**

1. Open Postman
2. Click **Import**
3. Select `postman/rest-api-collection.json`
4. Done! ✅

### **3. Setup Environment**

Create a new environment with these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `baseUrl` | `http://localhost:5000` | Backend server URL |
| `accessToken` | _(empty)_ | Auto-populated after login |

---

## 📂 Collection Structure

### **🔐 Authentication** (2 endpoints)
- **Register** - Create new account (auto-saves token)
- **Login** - Login existing user (auto-saves token)

### **👤 Users** (3 endpoints)
- Get User by ID
- Get User by Email
- Create User

### **📦 Products** (5 endpoints)
- Get All Products
- Get Product by ID
- Create Product
- Update Product
- Delete Product

### **📂 Categories** (5 endpoints)
- Get All Categories
- Get Category by ID
- Create Category
- Update Category
- Delete Category

### **🛒 Cart** (5 endpoints)
- Get Cart
- Add to Cart
- Update Cart Item
- Remove from Cart
- Clear Cart

### **📝 Orders** (6 endpoints)
- Get My Orders
- Get Order by ID
- Create Order
- Update Order Status
- Cancel Order
- Get All Orders (Admin)

### **⭐ Reviews** (4 endpoints)
- Get Product Reviews
- Create Review
- Update Review
- Delete Review

---

## 🧪 Testing Workflow

### **Step 1: Authentication**

Start with **Login** to get an access token:

```http
POST /api/auth/login
{
  "email": "customer@example.com",
  "password": "customer123"
}
```

✅ Token is **automatically saved** to `{{accessToken}}`!

### **Step 2: Test Endpoints**

All authenticated endpoints use: `Authorization: Bearer {{accessToken}}`

### **Step 3: Example Flow**

1. **Login** → Get token
2. **Get All Products** → Browse products
3. **Add to Cart** → Add product to cart
4. **Get Cart** → Verify cart contents
5. **Create Order** → Place order
6. **Get My Orders** → Check order status

---

## 🔑 Test Credentials

From database seed:

**Admin:**
- Email: `admin@ecommerce.com`
- Password: `admin123`

**Customer:**
- Email: `customer@example.com`
- Password: `customer123`

---

## 🎯 Features

### **✅ Auto Token Management**

Login and Register requests automatically save the access token:

```javascript
// Postman test script (auto-included)
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("accessToken", response.accessToken);
}
```

### **✅ Example Bodies**

All POST/PUT requests include example request bodies with proper formatting.

### **✅ Path Variables**

All dynamic routes (`:id`, `:email`) include placeholder values for easy testing.

### **✅ Query Parameters**

Endpoints with query params include examples (pagination, filters).

---

## 🛠️ Manual Collection Generation

If you want to regenerate the collection:

```bash
# From apps/server directory
pnpm postman:generate
```

**Output:** `postman/rest-api-collection.json`

---

## 📝 Collection Customization

The collection is generated from `scripts/generate-postman.ts`. To add/modify endpoints:

1. Edit `scripts/generate-postman.ts`
2. Run `pnpm postman:generate`
3. Re-import in Postman

---

## 🧪 Running Tests with Newman

Run the collection from command line:

```bash
pnpm postman:test
```

*(Requires [Newman](https://www.npmjs.com/package/newman) to be configured)*

---

## 🎨 Folder Icons

Each folder has an emoji for easy visual navigation:

- 🔐 Authentication
- 👤 Users
- 📦 Products
- 📂 Categories
- 🛒 Cart
- 📝 Orders
- ⭐ Reviews

---

## 📚 API Documentation

For detailed API specs, see:
- [Backend README](../README.md)
- [REST Migration Success](../REST_MIGRATION_SUCCESS.md)

---

## 🐛 Troubleshooting

### **Token not saving?**
- Make sure you're using an **Environment** (not global variables)
- Check the **Tests** tab in Login request - auto-save script should be there

### **401 Unauthorized?**
- Login first to get a fresh token
- Check `{{accessToken}}` in your environment
- Ensure Authorization header is set: `Bearer {{accessToken}}`

### **Connection refused?**
- Start the backend: `pnpm dev` (from `apps/server`)
- Server should be running on `http://localhost:5000`

### **Base URL wrong?**
- Update environment variable: `baseUrl = http://localhost:5000`
- Make sure it's port 5000, not 3000

---

## ✨ Tips & Tricks

1. **Use Folders** - Collapse/expand for easier navigation
2. **Test Scripts** - Login/Register auto-save tokens
3. **Variables** - Use `{{baseUrl}}` and `{{accessToken}}` everywhere
4. **Collections** - Organize requests by feature
5. **Environments** - Create separate environments for dev/staging/prod

---

## 📦 What's Included

- ✅ **30 REST endpoints**
- ✅ **7 organized folders**
- ✅ **Auto token management**
- ✅ **Example request bodies**
- ✅ **Test credentials**
- ✅ **Environment variables setup**
- ✅ **Path variable placeholders**
- ✅ **Query parameter examples**

---

## 🎉 Happy Testing!

Your collection is ready to go. Start with Login and explore the API! 🚀
