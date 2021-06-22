const presets = {
  antd: {
    plugins: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekday',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'localizedFormat',
    ],
  },
  antdv3: {
    plugins: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekday',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'localizedFormat',
      'badMutable'
    ],
  }
}

function vitePluginMomentToDayjs(config = { preset: 'antd' }) {
  const { preset, plugins } = config;
  let dayjsPlugins = [];
  if (preset && presets[preset]) {
    dayjsPlugins = presets[preset].plugins;
  }
  if (plugins) dayjsPlugins = plugins;

  return {
    name: 'vite-plugin-moment-to-dayjs',

    config() {
      return {
        resolve: {
          alias: {
            moment: 'dayjs', // 将 moment 替换为 dayjs
          },
        },
      };
    },

    load(id) {
      if (id.includes('moment.js')) {
        // 导入 moment 时，将代码改为导入 dayjs 和使用到的插件
        let code = `import dayjs from 'dayjs';`;

        dayjsPlugins.forEach((plugin) => {
          code += `import ${plugin} from 'dayjs/esm/plugin/${plugin}';dayjs.extend(${plugin});`;
        });

        code += `export default dayjs;`;
        return code;
      }
      return null;
    },
  };
}

module.exports = vitePluginMomentToDayjs

