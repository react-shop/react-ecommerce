# Environment Variables Setup

Create a `.env.local` file in the `apps/web` directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001

# Optional: OAuth Configuration
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
# NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Notes

- `NEXT_PUBLIC_*` variables are exposed to the browser
- Restart the dev server after changing environment variables
- Never commit `.env.local` to version control

