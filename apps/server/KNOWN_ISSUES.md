# Known Issues

## Jest Testing with pnpm (CRITICAL)

**Status:** ⚠️ **UNRESOLVED** - Blocking unit tests  
**Priority:** High  
**Last Updated:** December 31, 2025

### Problem

Jest tests cannot run due to module resolution issue with pnpm:

```
Error: Cannot find module '@jest/test-sequencer'
```

### Root Cause

This is a known issue with pnpm + Jest where internal Jest dependencies are not properly resolved due to pnpm's strict node_modules structure. The `@jest/test-sequencer` package is bundled with Jest but not accessible to jest-config when running in a pnpm workspace.

### Attempted Solutions

1. ✗ Explicit install of `@jest/test-sequencer`
2. ✗ Updated `.npmrc` with `shamefully-hoist=true` and public-hoist-pattern
3. ✗ Clean reinstall of node_modules
4. ✗ Downgraded from Jest 30 to Jest 29
5. ✗ Created dedicated `jest.config.js`
6. ✗ Set `testSequencer: null` in jest.config

### Workarounds

#### Option A: Use Postman for API Testing ✅ **RECOMMENDED**

The Postman collection is fully configured and working:

```bash
# Import postman/react-ecommerce-api.postman_collection.json
# Start backend
cd apps/server
pnpm dev

# Test all endpoints via Postman
```

**Advantages:**
- ✅ Works immediately
- ✅ Tests real GraphQL endpoints
- ✅ Better for API validation
- ✅ Includes automated test scripts

#### Option B: Switch to npm/yarn Temporarily

```bash
# In apps/server
npm install
npm test -- cart.service.spec.ts
```

#### Option C: Use npx directly (Untested)

```bash
cd apps/server
npx jest cart.service.spec.ts --config jest.config.js
```

### Impact

- ❌ Cannot run unit tests (`*.spec.ts`)
- ❌ Cannot measure code coverage
- ✅ API testing works via Postman
- ✅ Backend runs normally
- ✅ All services are implemented

### Solution Needed

**Long-term fixes (choose one):**

1. **Migrate to npm/yarn** - Replace pnpm (breaking change)
2. **Wait for pnpm fix** - Known issue, may be resolved in future
3. **Use Vitest instead** - Modern alternative to Jest
4. **Create custom test runner** - Bypass Jest entirely

### Related Issues

- [pnpm/pnpm#4679](https://github.com/pnpm/pnpm/issues/4679)
- [facebook/jest#11956](https://github.com/facebook/jest/issues/11956)

### Recommendation

**For now:** Use **Postman collection** for comprehensive API testing. Unit tests are written and ready - they just need Jest to be fixed or replaced.

**Future:** Consider migrating to **Vitest** which has better pnpm support and is faster than Jest.

---

## Other Known Issues

### Peer Dependency Warnings

**Status:** ⚠️ Non-blocking warnings  
**Impact:** Low - Everything works despite warnings

```
@nestjs/graphql requires @nestjs/common@^11.0.1 (found 10.4.20)
@nestjs/apollo requires @nestjs/common@^11.0.1 (found 10.4.20)
```

**Solution:** Upgrade to NestJS 11 when stable (currently on v10)

---

## Deprecation Warnings

**Status:** ℹ️ Informational  
**Impact:** None currently

Several subdependencies are deprecated but still functional:
- `@apollo/server-plugin-landing-page-graphql-playground`
- Various Babel plugins
- `glob`, `rimraf`, `inflight`

**Solution:** Will be resolved when parent packages update their dependencies

---

## Testing Status

| Type | Status | Tool |
|------|--------|------|
| Unit Tests | ⚠️ **Blocked** | Jest (not working) |
| Integration Tests | ⚠️ **Blocked** | Jest (not working) |
| API Tests | ✅ **Working** | Postman |
| E2E Tests | ⏳ Pending | Not started |

---

## Next Steps

1. ✅ Use Postman for immediate API testing
2. ⏳ Decide on Jest alternative (Vitest recommended)
3. ⏳ Implement chosen solution
4. ⏳ Run all unit tests
5. ⏳ Achieve 80%+ coverage

---

**For questions or updates, see:** [TESTING_GUIDE.md](./TESTING_GUIDE.md)

