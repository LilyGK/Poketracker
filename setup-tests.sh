#!/bin/bash

echo "🤖 PokeTracker Appium Test Setup"
echo "================================="
echo ""

# Check Java
echo "✓ Checking Java version..."
java -version 2>&1 | head -1
echo ""

# Check Android SDK
echo "✓ Checking Android SDK..."
if [ -z "$ANDROID_HOME" ]; then
    echo "❌ ANDROID_HOME is not set"
    exit 1
else
    echo "✓ ANDROID_HOME: $ANDROID_HOME"
fi
echo ""

# Check ADB
echo "✓ Checking ADB..."
if ! command -v adb &> /dev/null; then
    echo "❌ ADB not found in PATH"
    exit 1
else
    adb version | head -1
fi
echo ""

# Check for running emulator/device
echo "✓ Checking for connected devices..."
DEVICES=$(adb devices | grep -v "List" | grep "device" | wc -l)
if [ $DEVICES -eq 0 ]; then
    echo "⚠️  No Android devices/emulators connected"
    echo "   Start an emulator or connect a device before running tests"
else
    echo "✓ Found $DEVICES connected device(s):"
    adb devices | grep "device" | grep -v "List"
fi
echo ""

# Build APK
echo "📦 Building debug APK..."
cd android
if ./gradlew assembleDebug; then
    echo "✓ APK built successfully"
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
        echo "✓ APK location: android/$APK_PATH"
        echo "✓ APK size: $APK_SIZE"
    fi
else
    echo "❌ Failed to build APK"
    cd ..
    exit 1
fi
cd ..
echo ""

# Check Appium
echo "✓ Checking Appium installation..."
if npx appium --version &> /dev/null; then
    APPIUM_VERSION=$(npx appium --version)
    echo "✓ Appium version: $APPIUM_VERSION"
else
    echo "❌ Appium not found"
    exit 1
fi
echo ""

# Check UiAutomator2 driver
echo "✓ Checking UiAutomator2 driver..."
if npx appium driver list --installed 2>&1 | grep -q "uiautomator2"; then
    echo "✓ UiAutomator2 driver installed"
else
    echo "⚠️  UiAutomator2 driver not found"
    echo "   Installing UiAutomator2 driver..."
    npx appium driver install uiautomator2
fi
echo ""

echo "================================="
echo "✅ Setup verification complete!"
echo ""
echo "To run tests:"
echo "  npm run wdio"
echo ""
echo "To run a specific test:"
echo "  npx wdio run ./wdio.conf.ts --spec ./test/specs/appLaunch.test.ts"
echo ""
