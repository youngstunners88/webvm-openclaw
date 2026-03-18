# WebVM + OpenClaw Setup Guide

This is a customized WebVM image with OpenClaw AI assistant pre-installed.

## What is included?

- Base Debian system with development tools (Python, Node.js, Ruby, Lua, etc.)
- Node.js 22+ (required for OpenClaw)
- OpenClaw AI assistant installed globally via npm
- Pre-configured welcome message with OpenClaw instructions

## Quick Start

### 1. Fork/Create Repository

Create a new GitHub repository and push these files:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/webvm-openclaw.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to Settings > Pages in your GitHub repo
2. Set Source to "GitHub Actions"
3. Save

### 3. Run the Deploy Workflow

1. Go to Actions > Deploy
2. Click "Run workflow"
3. Set these parameters:
   - **DOCKERFILE_PATH**: `dockerfiles/debian_openclaw`
   - **IMAGE_SIZE**: `950M` (OpenClaw + Node.js needs more space)
   - **DEPLOY_TO_GITHUB_PAGES**: ✓ (checked)
   - **GITHUB_RELEASE**: ✓ (checked)
4. Click "Run workflow"

### 4. Access Your WebVM

After the workflow completes (takes ~5-10 minutes):
1. Go to Settings > Pages to find your deployment URL
2. Open the URL in your browser
3. You'll see a Linux terminal running in your browser!

### 5. Using OpenClaw

Once the terminal loads, you'll see the welcome message. Run:

```bash
# Set up OpenClaw with guided onboarding
openclaw onboard --install-daemon

# Or start the gateway manually
openclaw gateway --port 18789 --verbose

# Send a test message
openclaw agent --message "Hello from WebVM!"
```

### 6. Configure AI Provider

You'll need to set up an AI provider. Options:
- OpenAI API key
- Anthropic Claude API key
- Or use local models via Ollama

```bash
openclaw config set openai.apiKey YOUR_API_KEY
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  WebVM (WebAssembly Linux VM)                       │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │  Debian System                              │  │   │
│  │  │  ┌─────────────────────────────────────────┐ │  │   │
│  │  │  │  Node.js 22+                            │ │  │   │
│  │  │  │  ┌─────────────────────────────────────┐ │ │  │   │
│  │  │  │  │  OpenClaw AI Assistant            │ │ │  │   │
│  │  │  │  │  • Answers questions                │ │ │  │   │
│  │  │  │  │  • Writes code                      │ │ │  │   │
│  │  │  │  │  • Connects to chat channels        │ │ │  │   │
│  │  │  │  └─────────────────────────────────────┘ │ │  │   │
│  │  │  └─────────────────────────────────────────┘ │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Local Development (Advanced)

If you want to run this locally instead of GitHub Pages:

```bash
# Download a pre-built ext2 image
wget "https://github.com/leaningtech/webvm/releases/download/ext2_image/debian_mini_20230519_5022088024.ext2"

# Install dependencies
npm install

# Update config to use local image
# Edit config_public_terminal.js:
#   diskImageUrl = "/disk-images/debian_mini_20230519_5022088024.ext2"
#   diskImageType = "bytes"

# Build
npm run build

# Serve with nginx
mkdir disk-images
mv debian_mini_*.ext2 disk-images/
nginx -p . -c nginx.conf

# Open http://127.0.0.1:8081
```

## Troubleshooting

### Image too large?
The default max is 950M. If your image is larger:
- Remove unnecessary packages from the Dockerfile
- Or use a smaller base image

### OpenClaw not found?
Make sure Node.js 22+ is installed and npm global bin is in PATH:
```bash
node --version  # Should be v22.x
npm --version
which openclaw    # Should show /usr/local/bin/openclaw
```

### Out of memory?
WebVM has browser memory limits. For heavy workloads:
- Use Firefox which has better WebAssembly support
- Close other browser tabs
- Enable hardware acceleration in browser settings

## Files Added

- `dockerfiles/debian_openclaw` - Custom Dockerfile with Node.js + OpenClaw
- `config_openclaw.js` - Configuration for local development
- `OPENCLAW_SETUP.md` - This guide

## Next Steps

1. Configure your AI provider in OpenClaw
2. Set up chat channels (Telegram, Slack, etc.)
3. Install additional skills: `openclaw skills search`
4. Explore the OpenClaw documentation: https://docs.openclaw.ai

---

Built with ❤️ using WebVM + OpenClaw
