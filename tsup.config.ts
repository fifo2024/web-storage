import type { Options } from 'tsup';

const config: Options = {
    entry: ['src/index.ts'],
    outDir: 'dist',
    dts: true, // 输出 d.ts 文件
    clean: true, // 每次打包前清空目录
    sourcemap: true,
    minify: true, // 压缩代码
    format: ['iife', 'cjs', 'esm'],
    // format: ['esm'], // iife模式下的全局变量名
    globalName: 'webStore',
};

export default config;
