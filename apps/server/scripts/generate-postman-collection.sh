#!/bin/bash

# Generate Postman Collection for REST API
# No server required - generates collection from code

set -e

echo "🚀 Generating Postman Collection for REST API..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the apps/server directory"
    exit 1
fi

# Run the TypeScript generation script
echo "📝 Generating collection from REST API endpoints..."
tsx scripts/generate-postman.ts

echo ""
echo "✅ Done! Collection ready to import in Postman"
echo ""
echo "🎯 Quick Start:"
echo "  1. Open Postman"
echo "  2. Import → File → Select: postman/rest-api-collection.json"
echo "  3. Create Environment with:"
echo "     - baseUrl: http://localhost:5000"
echo "     - accessToken: (leave empty)"
echo "  4. Start with '🔐 Authentication → Login'"
echo ""
echo "💡 Pro Tip: The Login request auto-saves your access token!"

