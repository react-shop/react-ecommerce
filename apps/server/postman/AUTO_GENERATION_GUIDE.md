# Auto-Generate Postman Collections from GraphQL

This guide explains multiple ways to automatically generate Postman collections from your GraphQL API.

---

## 🎯 **Why Auto-Generate?**

- ✅ **Always up-to-date** - Regenerate when schema changes
- ✅ **No manual work** - Introspection does the heavy lifting
- ✅ **All endpoints** - Never miss a query or mutation
- ✅ **Type-safe** - Based on actual GraphQL schema

---

## 🚀 **Method 1: Use Postman's Built-in GraphQL Support** ⭐ **EASIEST**

Postman has **native GraphQL introspection** built-in!

### Steps:

1. **Start your backend:**
   ```bash
   cd apps/server
   pnpm dev
   ```

2. **In Postman:**
   - Click **New** → **GraphQL Request**
   - Enter URL: `http://localhost:3000/graphql`
   - Click **Schema** → **Introspect**
   - Postman auto-loads your entire schema!

3. **Build queries visually:**
   - Use the **Query Builder** (right panel)
   - Check fields you want
   - Postman generates the query automatically

4. **Save to collection:**
   - Save each request to a collection
   - Add tests and variables as needed

**Pros:**
- ✅ No CLI tools needed
- ✅ Visual query builder
- ✅ Auto-complete for fields
- ✅ Real-time validation

**Cons:**
- ⚠️ Manual saving of each query
- ⚠️ Needs Postman app open

---

## 🛠️ **Method 2: CLI Tool - `graphql-to-postman`**

Generates a complete collection from your GraphQL endpoint.

### Setup:

```bash
# Install globally
npm install -g graphql-to-postman

# Or use npx (no install)
npx graphql-to-postman --help
```

### Usage:

```bash
# Make sure backend is running
cd apps/server
pnpm dev

# Generate collection
npx graphql-to-postman \
  --url http://localhost:3000/graphql \
  --output ./postman/auto-generated.json \
  --name "React Ecommerce API (Auto)"
```

### Automated Script:

We've created a script for you:

```bash
# Make executable
chmod +x scripts/generate-postman-collection.sh

# Run
./scripts/generate-postman-collection.sh
```

**Pros:**
- ✅ Fully automated
- ✅ All endpoints included
- ✅ Can be integrated into CI/CD

**Cons:**
- ⚠️ Generated queries are basic (no nested fields)
- ⚠️ Need to customize after generation

---

## 🔧 **Method 3: Custom TypeScript Generator**

Use our custom script for more control:

### Setup:

```bash
cd apps/server
pnpm add -D graphql
```

### Run:

```bash
# Start backend first
pnpm dev

# Generate collection (in another terminal)
tsx scripts/generate-postman.ts
```

### Customize:

Edit `scripts/generate-postman.ts` to:
- Add authentication headers
- Include nested fields
- Add example variables
- Group by feature (Auth, Products, Cart, etc.)

**Pros:**
- ✅ Full control over output
- ✅ Can add custom logic
- ✅ Type-safe with TypeScript

**Cons:**
- ⚠️ Requires maintenance
- ⚠️ More complex setup

---

## 📦 **Method 4: From GraphQL Schema File**

If you have a schema file (`.graphql` or `.gql`):

### Install:

```bash
npm install -g @arikael/graphql-to-postman
```

### Generate:

```bash
# From schema file
graphql-to-postman \
  --schema src/graphql/schemas/schema.gql \
  --output postman/from-schema.json
```

**Pros:**
- ✅ No need for running server
- ✅ Works offline

**Cons:**
- ⚠️ Schema file must be up-to-date
- ⚠️ Doesn't validate against running API

---

## 🔄 **Method 5: Apollo Studio → Postman**

If you're using Apollo Studio:

1. **Export schema from Apollo:**
   ```bash
   npx apollo client:download-schema schema.json \
     --endpoint http://localhost:3000/graphql
   ```

2. **Convert to Postman:**
   ```bash
   graphql-to-postman --schema schema.json \
     --output postman/apollo-collection.json
   ```

---

## 🎨 **Method 6: Insomnia → Postman**

Insomnia has better GraphQL support. You can:

1. Import GraphQL schema in Insomnia
2. Build requests visually
3. Export as Postman collection v2.1

### Steps:

1. **In Insomnia:**
   - Create new Request Collection
   - Add GraphQL request
   - Set URL: `http://localhost:3000/graphql`
   - Click "Reload Schema"

2. **Build requests** using visual editor

3. **Export:**
   - Collection → Export → Postman v2.1

---

## ⚙️ **Recommended Workflow**

### For Development (Quick Testing):
```bash
# Use Postman's built-in introspection
1. Open Postman
2. New GraphQL Request
3. Introspect schema
4. Use query builder
```

### For Documentation (One-time):
```bash
# Generate base collection
npx graphql-to-postman \
  --url http://localhost:3000/graphql \
  --output postman/base-collection.json

# Manually enhance:
- Add auth flows
- Add test assertions
- Add example variables
- Organize into folders
```

### For CI/CD (Automated Testing):
```bash
# Add to package.json
{
  "scripts": {
    "postman:generate": "tsx scripts/generate-postman.ts",
    "postman:test": "newman run postman/collection.json"
  }
}

# Run in CI
pnpm postman:generate
pnpm postman:test
```

---

## 📝 **Adding to package.json**

Add these scripts:

```json
{
  "scripts": {
    "postman:generate": "tsx scripts/generate-postman.ts",
    "postman:generate:cli": "graphql-to-postman --url http://localhost:3000/graphql --output postman/auto-generated.json",
    "postman:test": "newman run postman/react-ecommerce-api.postman_collection.json -e postman/env.json"
  }
}
```

---

## 🔥 **Best Practices**

### 1. **Version Control Strategy**

```
postman/
├── manual-collection.json       # Hand-crafted, checked in
├── auto-generated.json         # Generated, .gitignore
└── AUTO_GENERATION_GUIDE.md   # This file
```

### 2. **Hybrid Approach** (Recommended)

```bash
# Generate base collection
pnpm postman:generate

# Import in Postman
# Manually enhance:
#   - Add auth workflow
#   - Add test assertions  
#   - Add realistic variables
#   - Export as manual-collection.json
```

### 3. **Keep Schema Updated**

```bash
# After schema changes
1. Restart backend
2. Regenerate collection
3. Merge with manual collection
4. Test all endpoints
```

---

## 🎯 **Quick Start (5 Minutes)**

**Easiest way to get started:**

```bash
# 1. Start backend
cd apps/server
pnpm dev

# 2. Open Postman
# 3. New → GraphQL Request
# 4. URL: http://localhost:3000/graphql
# 5. Click "Introspect" (lightning icon)
# 6. Use Query Builder to create requests

# Done! ✅
```

---

## 🆚 **Comparison Table**

| Method | Automation | Customization | Setup Time |
|--------|------------|---------------|------------|
| Postman Built-in | Manual | High | 1 min |
| CLI Tool | Full | Low | 5 min |
| Custom Script | Full | Very High | 30 min |
| Schema File | Full | Medium | 10 min |
| Apollo Studio | Semi | Medium | 15 min |
| Insomnia Export | Manual | High | 10 min |

---

## 🚨 **Troubleshooting**

### Schema introspection fails

```bash
# Check if server is running
curl http://localhost:3000/graphql

# Check if introspection is enabled (should be in dev)
# In src/app.module.ts:
GraphQLModule.forRoot({
  introspection: true, // ✅ Should be true in dev
})
```

### Generated queries are too basic

```bash
# Use custom script with field selection
# Or manually enhance after generation
```

### Authentication issues

```bash
# Add auth headers to generated collection:
{
  "header": [
    {
      "key": "Authorization",
      "value": "Bearer {{accessToken}}"
    }
  ]
}
```

---

## 📚 **Resources**

- [Postman GraphQL Docs](https://learning.postman.com/docs/sending-requests/supported-api-frameworks/graphql/)
- [graphql-to-postman](https://www.npmjs.com/package/graphql-to-postman)
- [Apollo Client CLI](https://www.apollographql.com/docs/devtools/cli/)
- [GraphQL Introspection](https://graphql.org/learn/introspection/)

---

## 🎉 **Conclusion**

**My Recommendation:**

1. **Right now:** Use Postman's built-in GraphQL introspection (fastest)
2. **For documentation:** Generate base with CLI, enhance manually
3. **For CI/CD:** Use custom TypeScript generator with Newman

Choose what fits your workflow best! 🚀

