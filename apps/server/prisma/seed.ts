import { PrismaClient, UserRole, ProductStatus, AttributeType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create demo customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
    },
  });
  console.log('✅ Customer user created:', customer.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and accessories',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'books' },
      update: {},
      create: {
        name: 'Books',
        slug: 'books',
        description: 'Books and literature',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-garden' },
      update: {},
      create: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and garden supplies',
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create attributes
  const attributes = await Promise.all([
    prisma.attribute.upsert({
      where: { name: 'Color' },
      update: {},
      create: {
        name: 'Color',
        type: AttributeType.COLOR,
        values: ['Red', 'Blue', 'Green', 'Black', 'White'],
      },
    }),
    prisma.attribute.upsert({
      where: { name: 'Size' },
      update: {},
      create: {
        name: 'Size',
        type: AttributeType.SIZE,
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
    }),
    prisma.attribute.upsert({
      where: { name: 'Material' },
      update: {},
      create: {
        name: 'Material',
        type: AttributeType.MATERIAL,
        values: ['Cotton', 'Polyester', 'Leather', 'Wool'],
      },
    }),
  ]);
  console.log('✅ Attributes created:', attributes.length);

  // Create products
  const products = [
    {
      name: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 89.99,
      categoryId: categories[0].id, // Electronics
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
      metaKeywords: ['headphones', 'wireless', 'bluetooth', 'audio'],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Premium Cotton T-Shirt',
      slug: 'premium-cotton-tshirt',
      description: 'Comfortable 100% cotton t-shirt in various colors',
      price: 29.99,
      categoryId: categories[1].id, // Clothing
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
      metaKeywords: ['tshirt', 'cotton', 'clothing'],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'The Great Gatsby - F. Scott Fitzgerald',
      slug: 'the-great-gatsby',
      description: 'Classic American novel by F. Scott Fitzgerald',
      price: 14.99,
      categoryId: categories[2].id, // Books
      images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f'],
      metaKeywords: ['book', 'fiction', 'classic'],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description: 'Comfortable office chair with lumbar support',
      price: 249.99,
      categoryId: categories[3].id, // Home & Garden
      images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8'],
      metaKeywords: ['chair', 'office', 'furniture', 'ergonomic'],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Smartphone Case',
      slug: 'smartphone-case',
      description: 'Protective case for smartphones',
      price: 19.99,
      categoryId: categories[0].id, // Electronics
      images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb'],
      metaKeywords: ['case', 'phone', 'accessories'],
      status: ProductStatus.ACTIVE,
    },
    {
      name: 'Running Shoes',
      slug: 'running-shoes',
      description: 'Lightweight running shoes for athletes',
      price: 79.99,
      categoryId: categories[1].id, // Clothing
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
      metaKeywords: ['shoes', 'running', 'sports'],
      status: ProductStatus.ACTIVE,
    },
  ];

  const createdProducts = [];
  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    createdProducts.push(created);
  }
  console.log('✅ Products created:', createdProducts.length);

  // Create product variants for the t-shirt
  const tshirt = createdProducts.find((p) => p.slug === 'premium-cotton-tshirt');
  if (tshirt) {
    const variants = await Promise.all([
      prisma.productVariant.upsert({
        where: { sku: 'CLOTH-001-RED-M' },
        update: {},
        create: {
          productId: tshirt.id,
          sku: 'CLOTH-001-RED-M',
          price: 29.99,
          stock: 20,
          attributes: { color: 'Red', size: 'M' },
        },
      }),
      prisma.productVariant.upsert({
        where: { sku: 'CLOTH-001-BLUE-L' },
        update: {},
        create: {
          productId: tshirt.id,
          sku: 'CLOTH-001-BLUE-L',
          price: 29.99,
          stock: 15,
          attributes: { color: 'Blue', size: 'L' },
        },
      }),
    ]);
    console.log('✅ Product variants created:', variants.length);
  }

  // Create reviews
  const headphones = createdProducts.find(
    (p) => p.slug === 'wireless-bluetooth-headphones'
  );
  if (headphones) {
    await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: customer.id,
          productId: headphones.id,
        },
      },
      update: {},
      create: {
        userId: customer.id,
        productId: headphones.id,
        rating: 5,
        comment:
          'These headphones are amazing. The noise cancellation works great and battery life is excellent.',
        status: 'APPROVED',
      },
    });
    console.log('✅ Reviews created');
  }

  // Create cart for customer
  const cart = await prisma.cart.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId: customer.id,
    },
  });

  // Add items to cart
  if (createdProducts.length > 0) {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId_variantId: {
          cartId: cart.id,
          productId: createdProducts[0].id,
          variantId: null,
        },
      },
      update: {},
      create: {
        cartId: cart.id,
        productId: createdProducts[0].id,
        quantity: 1,
      },
    });
    console.log('✅ Cart items created');
  }

  // Create wishlist for customer
  const wishlist = await prisma.wishlist.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId: customer.id,
      products: {
        connect: createdProducts.slice(0, 2).map((p) => ({ id: p.id })),
      },
    },
  });
  console.log('✅ Wishlist created');

  // Create store settings
  await prisma.storeSetting.upsert({
    where: { key: 'store_name' },
    update: {},
    create: {
      key: 'store_name',
      value: { name: 'React Ecommerce Store' },
    },
  });

  await prisma.storeSetting.upsert({
    where: { key: 'store_email' },
    update: {},
    create: {
      key: 'store_email',
      value: { email: 'support@ecommerce.com' },
    },
  });

  await prisma.storeSetting.upsert({
    where: { key: 'currency' },
    update: {},
    create: {
      key: 'currency',
      value: { code: 'USD', symbol: '$' },
    },
  });
  console.log('✅ Store settings created');

  console.log('');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📝 Test Credentials:');
  console.log('   Admin:    admin@ecommerce.com / admin123');
  console.log('   Customer: customer@example.com / customer123');
  console.log('');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

