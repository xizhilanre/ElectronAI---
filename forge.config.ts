import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: ForgeConfig = {
  packagerConfig: {
    name:'VChat',
    icon: './assets/icon',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    // new MakerSquirrel({
    //   // 应用信息
    //   name: 'VChat',
    //   authors: 'Viking Zhang',
    //   description: 'A chat application',
    //   // 安装程序配置
    //   setupIcon: './assets/icon.ico',  // Windows 安装图标
    //   iconUrl: 'https://raw.githubusercontent.com/your-repo/vchat/main/assets/icon.ico', // 远程图标URL
    //   // 快捷方式设置
    //   setupExe: 'VChat-Setup.exe',  // 安装程序名称
    // }),
    // new MakerRpm({}), 
    // new MakerDeb({}),
    // @ts-expect-error - https://github.com/electron/forge/issues/3712
    new MakerDMG({
      icon: './assets/icon.icns',
      format: 'ULFO',
    }),
    new MakerZIP({}, ['darwin']), 
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'vikingmute',
          name: 'vvchat'
        },
        prerelease: false,
        draft: true,
        authToken: process.env.GITHUB_TOKEN
      }
    }
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
