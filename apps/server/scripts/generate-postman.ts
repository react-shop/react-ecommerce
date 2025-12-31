import { writeFileSync } from 'fs';
import { join } from 'path';

interface PostmanRequest {
  name: string;
  request: {
    method: string;
    header: Array<{ key: string; value: string; type?: string }>;
    body?: {
      mode: string;
      raw?: string;
    };
    url: {
      raw: string;
      protocol: string;
      host: string[];
      port: string;
      path: string[];
      variable?: Array<{ key: string; value: string }>;
    };
  };
  event?: Array<{
    listen: string;
    script: {
      type: string;
      exec: string[];
    };
  }>;
}

interface PostmanFolder {
  name: string;
  item: PostmanRequest[];
}

interface PostmanCollection {
  info: {
    name: string;
    description: string;
    schema: string;
  };
  variable: Array<{ key: string; value: string; type: string }>;
  item: PostmanFolder[];
}

function generatePostmanCollection(): PostmanCollection {
  const collection: PostmanCollection = {
    info: {
      name: 'React Ecommerce REST API',
      description: 'Complete REST API for ecommerce backend - Auth, Products, Cart, Orders, Reviews',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    variable: [
      {
        key: 'baseUrl',
        value: 'http://localhost:5000',
        type: 'string',
      },
      {
        key: 'accessToken',
        value: '',
        type: 'string',
      },
    ],
    item: [],
  };

  // Auth Endpoints
  collection.item.push({
    name: '🔐 Authentication',
    item: [
      {
        name: 'Register',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              email: 'user@example.com',
              password: 'password123',
              firstName: 'John',
              lastName: 'Doe',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/auth/register',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'auth', 'register'],
          },
        },
        event: [
          {
            listen: 'test',
            script: {
              type: 'text/javascript',
              exec: [
                'if (pm.response.code === 201) {',
                '    const response = pm.response.json();',
                '    pm.environment.set("accessToken", response.accessToken);',
                '    pm.test("Token saved", () => {',
                '        pm.expect(response.accessToken).to.exist;',
                '    });',
                '}',
              ],
            },
          },
        ],
      },
      {
        name: 'Login',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              email: 'customer@example.com',
              password: 'customer123',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/auth/login',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'auth', 'login'],
          },
        },
        event: [
          {
            listen: 'test',
            script: {
              type: 'text/javascript',
              exec: [
                'if (pm.response.code === 200) {',
                '    const response = pm.response.json();',
                '    pm.environment.set("accessToken", response.accessToken);',
                '    pm.test("Login successful", () => {',
                '        pm.expect(response.user).to.exist;',
                '        pm.expect(response.accessToken).to.exist;',
                '    });',
                '}',
              ],
            },
          },
        ],
      },
    ],
  });

  // User Endpoints
  collection.item.push({
    name: '👤 Users',
    item: [
      {
        name: 'Get User by ID',
        request: {
          method: 'GET',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/users/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'users', ':id'],
            variable: [{ key: 'id', value: 'user-id-here' }],
          },
        },
      },
      {
        name: 'Get User by Email',
        request: {
          method: 'GET',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/users/email/:email',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'users', 'email', ':email'],
            variable: [{ key: 'email', value: 'user@example.com' }],
          },
        },
      },
      {
        name: 'Create User',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              email: 'newuser@example.com',
              password: 'password123',
              firstName: 'New',
              lastName: 'User',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/users',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'users'],
          },
        },
      },
    ],
  });

  // Product Endpoints
  collection.item.push({
    name: '📦 Products',
    item: [
      {
        name: 'Get All Products',
        request: {
          method: 'GET',
          header: [],
          url: {
            raw: '{{baseUrl}}/api/products',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'products'],
          },
        },
      },
      {
        name: 'Get Product by ID',
        request: {
          method: 'GET',
          header: [],
          url: {
            raw: '{{baseUrl}}/api/products/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'products', ':id'],
            variable: [{ key: 'id', value: 'product-id-here' }],
          },
        },
      },
      {
        name: 'Create Product',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              name: 'New Product',
              slug: 'new-product',
              description: 'Product description',
              shortDesc: 'Short description',
              price: 99.99,
              sku: 'SKU-001',
              status: 'active',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/products',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'products'],
          },
        },
      },
      {
        name: 'Update Product',
        request: {
          method: 'PUT',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              name: 'Updated Product Name',
              price: 129.99,
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/products/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'products', ':id'],
            variable: [{ key: 'id', value: 'product-id-here' }],
          },
        },
      },
      {
        name: 'Delete Product',
        request: {
          method: 'DELETE',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/products/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'products', ':id'],
            variable: [{ key: 'id', value: 'product-id-here' }],
          },
        },
      },
    ],
  });

  // Category Endpoints
  collection.item.push({
    name: '📂 Categories',
    item: [
      {
        name: 'Get All Categories',
        request: {
          method: 'GET',
          header: [],
          url: {
            raw: '{{baseUrl}}/api/categories',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'categories'],
          },
        },
      },
      {
        name: 'Get Category by ID',
        request: {
          method: 'GET',
          header: [],
          url: {
            raw: '{{baseUrl}}/api/categories/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'categories', ':id'],
            variable: [{ key: 'id', value: 'category-id-here' }],
          },
        },
      },
      {
        name: 'Create Category',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              name: 'Electronics',
              description: 'Electronic devices and accessories',
              slug: 'electronics',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/categories',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'categories'],
          },
        },
      },
      {
        name: 'Update Category',
        request: {
          method: 'PUT',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              name: 'Updated Category Name',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/categories/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'categories', ':id'],
            variable: [{ key: 'id', value: 'category-id-here' }],
          },
        },
      },
      {
        name: 'Delete Category',
        request: {
          method: 'DELETE',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/categories/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'categories', ':id'],
            variable: [{ key: 'id', value: 'category-id-here' }],
          },
        },
      },
    ],
  });

  // Cart Endpoints
  collection.item.push({
    name: '🛒 Cart',
    item: [
      {
        name: 'Get Cart',
        request: {
          method: 'GET',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/cart',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'cart'],
          },
        },
      },
      {
        name: 'Add to Cart',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              productId: 'product-id-here',
              quantity: 1,
              variantId: null,
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/cart/items',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'cart', 'items'],
          },
        },
      },
      {
        name: 'Update Cart Item',
        request: {
          method: 'PUT',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              quantity: 3,
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/cart/items/:itemId',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'cart', 'items', ':itemId'],
            variable: [{ key: 'itemId', value: 'cart-item-id-here' }],
          },
        },
      },
      {
        name: 'Remove from Cart',
        request: {
          method: 'DELETE',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/cart/items/:itemId',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'cart', 'items', ':itemId'],
            variable: [{ key: 'itemId', value: 'cart-item-id-here' }],
          },
        },
      },
      {
        name: 'Clear Cart',
        request: {
          method: 'DELETE',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/cart',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'cart'],
          },
        },
      },
    ],
  });

  // Order Endpoints
  collection.item.push({
    name: '📝 Orders',
    item: [
      {
        name: 'Get My Orders',
        request: {
          method: 'GET',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/orders?page=1&limit=10',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'orders'],
          },
        },
      },
      {
        name: 'Get Order by ID',
        request: {
          method: 'GET',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/orders/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'orders', ':id'],
            variable: [{ key: 'id', value: 'order-id-here' }],
          },
        },
      },
      {
        name: 'Create Order',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              shippingAddressId: 'address-id-here',
              billingAddressId: 'address-id-here',
              discountCode: null,
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/orders',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'orders'],
          },
        },
      },
      {
        name: 'Update Order Status',
        request: {
          method: 'PUT',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              status: 'PROCESSING',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/orders/:id/status',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'orders', ':id', 'status'],
            variable: [{ key: 'id', value: 'order-id-here' }],
          },
        },
      },
      {
        name: 'Cancel Order',
        request: {
          method: 'PUT',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/orders/:id/cancel',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'orders', ':id', 'cancel'],
            variable: [{ key: 'id', value: 'order-id-here' }],
          },
        },
      },
      {
        name: 'Get All Orders (Admin)',
        request: {
          method: 'GET',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/orders/admin/all?page=1&limit=10',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'orders', 'admin', 'all'],
          },
        },
      },
    ],
  });

  // Review Endpoints
  collection.item.push({
    name: '⭐ Reviews',
    item: [
      {
        name: 'Get Product Reviews',
        request: {
          method: 'GET',
          header: [],
          url: {
            raw: '{{baseUrl}}/api/reviews/product/:productId?status=APPROVED&minRating=3',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'reviews', 'product', ':productId'],
            variable: [{ key: 'productId', value: 'product-id-here' }],
          },
        },
      },
      {
        name: 'Create Review',
        request: {
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              productId: 'product-id-here',
              rating: 5,
              title: 'Great product!',
              comment: 'I love this product. Highly recommended!',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/reviews',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'reviews'],
          },
        },
      },
      {
        name: 'Update Review',
        request: {
          method: 'PUT',
          header: [
            { key: 'Content-Type', value: 'application/json', type: 'text' },
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify({
              rating: 4,
              title: 'Good product',
              comment: 'Updated review content',
            }, null, 2),
          },
          url: {
            raw: '{{baseUrl}}/api/reviews/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'reviews', ':id'],
            variable: [{ key: 'id', value: 'review-id-here' }],
          },
        },
      },
      {
        name: 'Delete Review',
        request: {
          method: 'DELETE',
          header: [
            { key: 'Authorization', value: 'Bearer {{accessToken}}', type: 'text' },
          ],
          url: {
            raw: '{{baseUrl}}/api/reviews/:id',
            protocol: 'http',
            host: ['{{baseUrl}}'],
            port: '',
            path: ['api', 'reviews', ':id'],
            variable: [{ key: 'id', value: 'review-id-here' }],
          },
        },
      },
    ],
  });

  return collection;
}

async function main() {
  console.log('🚀 Generating Postman Collection for REST API...');

  try {
    const collection = generatePostmanCollection();
    
    const totalEndpoints = collection.item.reduce((sum, folder) => sum + folder.item.length, 0);
    console.log(`📝 Generated ${collection.item.length} folders with ${totalEndpoints} endpoints`);

    const outputPath = join(__dirname, '../postman/rest-api-collection.json');
    writeFileSync(outputPath, JSON.stringify(collection, null, 2));

    console.log('✅ Postman collection generated successfully!');
    console.log(`📁 Location: ${outputPath}`);
    console.log('');
    console.log('📊 Endpoints by category:');
    collection.item.forEach(folder => {
      console.log(`  ${folder.name}: ${folder.item.length} endpoints`);
    });
    console.log('');
    console.log('🎯 Next steps:');
    console.log('  1. Import collection in Postman');
    console.log('  2. Set environment variables:');
    console.log('     - baseUrl: http://localhost:5000');
    console.log('     - accessToken: (auto-set after login)');
    console.log('  3. Test endpoints starting with Register/Login');
    console.log('');
    console.log('💡 Tip: Login request automatically saves the access token!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
