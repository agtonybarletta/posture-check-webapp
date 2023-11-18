import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { resolve } from 'path'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
    },
    build: {
      target: browserslistToEsbuild(),
      outDir: 'dist',
      rollupOptions: {
        /* this may be very useful to move ./about.html into ./src and  map the output
         * to any dist/<folder> we want
         * https://rollupjs.org/configuration-options/#input
         * 
         input: {
        main: resolve(__dirname, 'src/index.tsx'), 
        main2: resolve(__dirname, './index.html'),
        nested: resolve(__dirname, 'src/static/about.html'),
        */
        input: ['src/index.tsx', './index.html', './about.html']
      },
    }
})
