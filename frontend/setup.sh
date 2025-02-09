#!/bin/bash

# Create main directory structure
mkdir -p src/{components,features,services,hooks,utils,types,store,assets}

# Create subdirectories
mkdir -p src/components/{common,project,issue}
mkdir -p src/features/{project,issue,search}
mkdir -p src/store/{common,project,issue}
mkdir -p src/assets/{images,styles}

# Create essential files
touch src/store/index.ts
touch src/services/api.ts
touch src/types/index.ts
touch src/utils/constants.ts

# Create base component files
touch src/components/common/Layout.tsx
touch src/components/common/Navbar.tsx
touch src/components/project/ProjectCard.tsx
touch src/components/issue/IssueCard.tsx

# Create feature files
touch src/features/project/projectSlice.ts
touch src/features/issue/issueSlice.ts
touch src/features/search/searchSlice.ts

# Create configuration files
echo "module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}" > tailwind.config.js

echo "module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}" > postcss.config.js

echo "✅ Project structure created successfully!"