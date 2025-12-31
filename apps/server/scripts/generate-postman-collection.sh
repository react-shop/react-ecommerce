#!/bin/bash

# Generate Postman Collection from GraphQL Schema
# This script uses GraphQL introspection to create a Postman collection

set -e

echo "🚀 Generating Postman Collection from GraphQL Schema..."

# Check if server is running
if ! curl -s http://localhost:3000/graphql > /dev/null; then
    echo "❌ Error: Backend server is not running!"
    echo "Please start the server with: pnpm dev"
    exit 1
fi

# Install graphql-to-postman if not already installed
if ! command -v graphql-to-postman &> /dev/null; then
    echo "📦 Installing graphql-to-postman..."
    npm install -g graphql-to-postman
fi

# Generate collection from GraphQL endpoint
echo "📝 Fetching GraphQL schema via introspection..."
graphql-to-postman \
    --url http://localhost:3000/graphql \
    --output ./postman/generated-collection.json \
    --name "React Ecommerce API (Generated)" \
    --description "Auto-generated from GraphQL schema"

echo "✅ Postman collection generated successfully!"
echo "📁 Location: apps/server/postman/generated-collection.json"
echo ""
echo "🎯 Next steps:"
echo "  1. Import the collection in Postman"
echo "  2. Set environment variables (baseUrl, accessToken)"
echo "  3. Test your endpoints!"

