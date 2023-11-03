import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'react-marzipano',
      fileName: 'react-marzipano'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom'
        }
      },
      plugins: [
        typescript({
          target: 'es5',
          rootDir: path.resolve(__dirname, 'src/'),
          declaration: true,
          declarationDir: path.resolve(__dirname, 'lib/'),
          exclude: path.resolve(__dirname, 'node_modules/**'),
          allowSyntheticDefaultImports: true,
        })
      ]
    }
  }
})
