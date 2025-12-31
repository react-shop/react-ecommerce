# Postman Collection for React Ecommerce API

This directory contains a comprehensive Postman collection for testing all GraphQL endpoints of the React Ecommerce API.

> 💡 **Auto-Generation Available:** You can automatically generate or update this collection from your GraphQL schema! See [AUTO_GENERATION_GUIDE.md](./AUTO_GENERATION_GUIDE.md) for multiple generation methods.

---

## 📦 What's Included

- **react-ecommerce-api.postman_collection.json** - Complete API collection with all endpoints
- Organized by feature modules
- Pre-configured environment variables
- Automated test scripts
- Example requests with sample data

---

## 🚀 Getting Started

### 1. Import Collection

1. Open Postman
2. Click "Import" in the top left
3. Drag and drop `react-ecommerce-api.postman_collection.json`
4. Collection will appear in your workspace

### 2. Configure Environment

The collection uses the following variables (automatically set):

```
baseUrl: http://localhost:3000
graphqlEndpoint: {{baseUrl}}/graphql
accessToken: (auto-filled after login)
userId: (auto-filled after registration)
productId: (auto-filled after fetching products)
orderId: (auto-filled after creating order)
```

### 3. Start Backend

```bash
cd apps/server
pnpm dev
```

Ensure PostgreSQL and Prisma are set up (see `README.md`).

---

## 📋 Collection Structure

```
React Ecommerce API/
├── Auth/
│   ├── Register Customer
│   ├── Login
│   └── Get Current User
├── Products/
│   ├── List Products
│   ├── Get Product by ID
│   └── Create Product (Admin)
├── Cart/
│   ├── Get Cart
│   ├── Add to Cart
│   └── Clear Cart
├── Orders/
│   ├── Create Order
│   └── Get Orders
├── Discounts/
│   └── Validate Discount Code
├── Reviews/
│   ├── Get Product Reviews
│   └── Create Review
└── Shipments/
    └── Track Shipment
```

---

## 🧪 Testing Workflow

### **Step 1: Authentication**

1. **Register Customer**
   - Creates a new user account
   - Auto-saves `accessToken` to collection variables
   - Auto-saves `userId`

2. **Login**
   - Authenticates existing user
   - Updates `accessToken`

3. **Get Current User**
   - Verifies authentication
   - Returns user profile

### **Step 2: Browse Products**

1. **List Products**
   - Fetches all products with pagination
   - Auto-saves first `productId` for next requests

2. **Get Product by ID**
   - Fetches product details
   - Shows images, variants, reviews

### **Step 3: Shopping Cart**

1. **Get Cart**
   - Fetches user's cart
   - Shows items, quantities, totals

2. **Add to Cart**
   - Adds product to cart
   - Updates cart totals

3. **Clear Cart**
   - Removes all items

### **Step 4: Checkout**

1. **Validate Discount Code**
   - Tests coupon validity
   - Shows discount amount

2. **Create Order**
   - Creates order from cart
   - Auto-saves `orderId`
   - Clears cart automatically

3. **Get Orders**
   - Lists user orders
   - Shows payment and shipment status

### **Step 5: Post-Purchase**

1. **Create Review**
   - Adds product review
   - Requires authentication

2. **Track Shipment**
   - Tracks order delivery
   - Public endpoint (no auth)

---

## 🔑 Authentication

Most endpoints require authentication:

```
Authorization: Bearer {{accessToken}}
```

The token is automatically managed by Postman after login.

### **User Roles**

- **CUSTOMER** - Regular user (default)
- **ADMIN** - Can create/update products
- **SUPER_ADMIN** - Full access

---

## 📝 Example Usage

### **Complete User Flow**

1. **Register** → Get token
2. **List Products** → Get productId
3. **Add to Cart** → Add 2x product
4. **Get Cart** → Verify items
5. **Validate Discount** → Check "SAVE10"
6. **Create Order** → With discount
7. **Get Orders** → View order history
8. **Track Shipment** → Monitor delivery
9. **Create Review** → Rate product

---

## 🛠️ Customization

### **Change Base URL**

Edit collection variable `baseUrl`:
```
Production: https://api.yourdomain.com
Staging: https://staging-api.yourdomain.com
Local: http://localhost:3000
```

### **Add New Endpoints**

1. Right-click folder
2. Add Request
3. Set method to POST
4. Set URL to `{{graphqlEndpoint}}`
5. Add GraphQL query/mutation

---

## 🧪 Automated Tests

Each request includes test scripts to:

✅ Verify status code (200)  
✅ Check response structure  
✅ Auto-save variables  
✅ Validate data types

### **Example Test Script**

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Should return products array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.products).to.be.an('array');
});
```

---

## 📊 Collection Statistics

| Category | Endpoints | Auth Required |
|----------|-----------|---------------|
| Auth | 3 | No |
| Products | 3 | 1/3 |
| Cart | 3 | Yes |
| Orders | 2 | Yes |
| Discounts | 1 | No |
| Reviews | 2 | 1/2 |
| Shipments | 1 | No |
| **Total** | **15** | **9/15** |

---

## 🚀 Advanced Features

### **Run Collection**

Run all requests in sequence:

1. Click "..." on collection
2. Select "Run collection"
3. Configure iterations
4. Click "Run React Ecommerce API"

### **Export Results**

- JSON reports
- HTML reports
- Newman CLI integration

### **Environment Variables**

Create multiple environments:
- Local Development
- Staging
- Production
- Testing

---

## 💡 Tips & Tricks

### **Quick Testing**

1. Import collection
2. Run "Register Customer"
3. Run "List Products"
4. Run "Add to Cart"
5. Variables auto-populate!

### **Debugging**

- Use Postman Console (View → Show Postman Console)
- Check request/response headers
- Inspect GraphQL errors

### **Sharing**

Export and share with team:
1. Right-click collection
2. Export
3. Share JSON file

---

## 📚 Related Documentation

- [GraphQL Schema](../src/graphql/schemas/schema.gql)
- [Backend README](../README.md)
- [Testing Guide](../TESTING_GUIDE.md)
- [API Documentation](http://localhost:3000/graphql) (GraphQL Playground)

---

## 🐛 Troubleshooting

### **401 Unauthorized**
- Token expired, re-login
- Check Authorization header

### **404 Not Found**
- Backend not running
- Check `baseUrl` variable

### **500 Internal Server Error**
- Check backend logs
- Verify database connection

---

## 🎯 Next Steps

After testing with Postman:

1. ✅ Verify all endpoints work
2. ✅ Check authentication flows
3. ✅ Test error scenarios
4. ✅ Validate data structure
5. ⬜ Create automated test suite
6. ⬜ Integrate with CI/CD
7. ⬜ Generate API documentation

---

**Happy Testing!** 🚀

