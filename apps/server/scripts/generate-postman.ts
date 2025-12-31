import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface PostmanRequest {
  name: string;
  request: {
    method: string;
    header: Array<{ key: string; value: string }>;
    body: {
      mode: string;
      graphql: {
        query: string;
        variables: string;
      };
    };
    url: {
      raw: string;
      host: string[];
    };
  };
}

interface PostmanCollection {
  info: {
    name: string;
    description: string;
    schema: string;
  };
  variable: Array<{ key: string; value: string; type: string }>;
  item: Array<{
    name: string;
    item: PostmanRequest[];
  }>;
}

async function fetchGraphQLSchema(url: string): Promise<any> {
  const introspectionQuery = getIntrospectionQuery();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: introspectionQuery,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch schema: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data;
}

function generatePostmanCollection(schema: any): PostmanCollection {
  const queries = schema.__schema.types.find((t: any) => t.name === 'Query');
  const mutations = schema.__schema.types.find((t: any) => t.name === 'Mutation');

  const collection: PostmanCollection = {
    info: {
      name: 'React Ecommerce API (Auto-Generated)',
      description: 'Generated from GraphQL introspection',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    variable: [
      {
        key: 'baseUrl',
        value: 'http://localhost:3000',
        type: 'string',
      },
      {
        key: 'graphqlEndpoint',
        value: '{{baseUrl}}/graphql',
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

  // Add Queries
  if (queries && queries.fields) {
    const queryRequests: PostmanRequest[] = queries.fields.map((field: any) => ({
      name: field.name,
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        body: {
          mode: 'graphql',
          graphql: {
            query: `query ${capitalize(field.name)} {\n  ${field.name}\n}`,
            variables: '{}',
          },
        },
        url: {
          raw: '{{graphqlEndpoint}}',
          host: ['{{graphqlEndpoint}}'],
        },
      },
    }));

    collection.item.push({
      name: 'Queries',
      item: queryRequests,
    });
  }

  // Add Mutations
  if (mutations && mutations.fields) {
    const mutationRequests: PostmanRequest[] = mutations.fields.map((field: any) => ({
      name: field.name,
      request: {
        method: 'POST',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        body: {
          mode: 'graphql',
          graphql: {
            query: `mutation ${capitalize(field.name)} {\n  ${field.name}\n}`,
            variables: '{}',
          },
        },
        url: {
          raw: '{{graphqlEndpoint}}',
          host: ['{{graphqlEndpoint}}'],
        },
      },
    }));

    collection.item.push({
      name: 'Mutations',
      item: mutationRequests,
    });
  }

  return collection;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function main() {
  const graphqlUrl = process.env.GRAPHQL_URL || 'http://localhost:3000/graphql';

  console.log('🚀 Generating Postman Collection...');
  console.log(`📡 Fetching schema from: ${graphqlUrl}`);

  try {
    const schema = await fetchGraphQLSchema(graphqlUrl);
    console.log('✅ Schema fetched successfully!');

    const collection = generatePostmanCollection(schema);
    console.log(`📝 Generated ${collection.item.length} endpoint groups`);

    const outputPath = join(__dirname, '../postman/auto-generated-collection.json');
    writeFileSync(outputPath, JSON.stringify(collection, null, 2));

    console.log('✅ Postman collection generated!');
    console.log(`📁 Location: ${outputPath}`);
    console.log('');
    console.log('🎯 Next steps:');
    console.log('  1. Import collection in Postman');
    console.log('  2. Customize queries with proper fields');
    console.log('  3. Add authentication headers');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

