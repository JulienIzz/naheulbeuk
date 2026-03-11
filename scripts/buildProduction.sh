#!/bin/bash

set -e

PLATFORM="${1:-all}"
CURRENT_VERSION=$(cat config/APP_VERSION)
RUNTIME_VERSION=$(cat config/RUNTIME_VERSION)

# Parse current version
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

echo ""
echo "Current version: $CURRENT_VERSION"
echo ""
echo "What type of release is this?"
echo "  1) patch  - Bug fixes ($CURRENT_VERSION → $MAJOR.$MINOR.$((PATCH + 1)))"
echo "  2) minor  - New features ($CURRENT_VERSION → $MAJOR.$((MINOR + 1)).0)"
echo "  3) major  - Breaking changes ($CURRENT_VERSION → $((MAJOR + 1)).0.0)"
echo ""
read -p "Enter choice [1/2/3]: " -n 1 -r VERSION_TYPE
echo ""

case "$VERSION_TYPE" in
  1)
    PATCH=$((PATCH + 1))
    ;;
  2)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  3)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  *)
    echo "Invalid choice. Aborting."
    exit 1
    ;;
esac

APP_VERSION="$MAJOR.$MINOR.$PATCH"

case "$PLATFORM" in
  android)
    PLATFORM_FLAG="--platform android"
    PLATFORM_NAME="Android"
    ;;
  ios)
    PLATFORM_FLAG="--platform ios"
    PLATFORM_NAME="iOS"
    ;;
  all)
    PLATFORM_FLAG=""
    PLATFORM_NAME="Android & iOS"
    ;;
  *)
    echo "Invalid platform: $PLATFORM"
    echo "Usage: $0 [android|ios|all]"
    exit 1
    ;;
esac

echo ""
echo "=========================================="
echo "  PRODUCTION BUILD - $PLATFORM_NAME"
echo "=========================================="
echo ""
echo "Version: $CURRENT_VERSION → $APP_VERSION"
echo ""
echo "The following actions will be performed:"
echo ""
echo "  0. Run tests"
echo "  1. Bump version in config/APP_VERSION"
echo "  2. Run expo prebuild (STAGE=production)"
echo "  3. Stage all changes (git add .)"
echo "  4. Commit: 'chore: bump to v$APP_VERSION (runtime $((RUNTIME_VERSION + 1)))'"
echo "  5. Create git tag: v$APP_VERSION"
echo "  6. Push to origin/main with tags"
echo "  7. Build & auto-submit to stores ($PLATFORM_NAME)"
echo ""
echo "=========================================="
echo ""

read -p "Do you want to proceed? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Build cancelled."
  exit 0
fi

echo ""
echo "Starting production build..."
echo ""

echo "$APP_VERSION" > config/APP_VERSION
echo "Version bumped: $CURRENT_VERSION → $APP_VERSION"
echo ""

yarn test
STAGE=production expo prebuild --clean
git add .
git commit -m "chore: bump to v$APP_VERSION (runtime $((RUNTIME_VERSION + 1)))"
git tag -a "v$APP_VERSION" -m "Release v$APP_VERSION"
git push origin main --tags
STAGE=production eas build --profile production $PLATFORM_FLAG

echo ""
echo "Production build completed successfully!"
