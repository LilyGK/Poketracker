#!/bin/bash

# PokeTracker Setup Verification Script

echo "🎮 PokeTracker Setup Verification"
echo "=================================="
echo ""

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js v16 or later."
    exit 1
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm not found."
    exit 1
fi

# Check project structure
echo ""
echo "Checking project structure..."

REQUIRED_FILES=(
    "package.json"
    "App.tsx"
    "src/store/index.ts"
    "src/api/pokeapi.ts"
    "src/navigation/AppNavigator.tsx"
    "src/screens/TodayScreen.tsx"
    "src/screens/PokedexScreen.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check if node_modules exists
echo ""
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed (node_modules exists)"
else
    echo "⚠️  Dependencies not installed yet"
    echo "   Run: npm install"
fi

# Summary
echo ""
echo "=================================="
echo "Setup Status Summary"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. If dependencies not installed, run: npm install"
echo "2. Start development server: npm start"
echo "3. Run on iOS: npm run ios (or press 'i')"
echo "4. Run on Android: npm run android (or press 'a')"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - PROJECT_SUMMARY.md - Implementation details"
echo ""
echo "🧪 All screens have Appium test IDs!"
echo "   See README.md for complete test ID reference"
echo ""
echo "Happy habit tracking! 🚀✨"
