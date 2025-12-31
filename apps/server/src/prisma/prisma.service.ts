import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    // Create PostgreSQL connection pool
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    });

    // Create Prisma adapter
    const adapter = new PrismaPg(pool);

    // Initialize PrismaClient with adapter
    super({ adapter });
    
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    const models = Reflect.ownKeys(this).filter(
      (key) => key[0] !== '_' && key !== 'constructor'
    );

    return Promise.all(models.map((modelKey) => (this as any)[modelKey].deleteMany()));
  }
}

