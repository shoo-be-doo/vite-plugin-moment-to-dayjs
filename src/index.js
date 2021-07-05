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

function vitePluginMomentToDayjs(config = {}) {
  const { preset = 'antdv3', plugins } = config;
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

    resolveId(id) {
      if (id.includes('moment.js')) {
        return id
      }
    },

    load(id) {
      // 开发时
      if (id.includes('moment.js')) {
        // 导入 moment 时，将代码改为导入 dayjs 和使用到的插件
        let code = `import dayjs from 'dayjs';`;

        dayjsPlugins.forEach((plugin) => {
          code += `import ${plugin} from 'dayjs/esm/plugin/${plugin}';dayjs.extend(${plugin});`;
        });

        code += `export default dayjs;`;
        return code;
      }

      // 编译时的id
      if (id.includes('dayjs.min.js')) {
        // 导入 moment 时，将代码改为导入 dayjs 和使用到的插件
        let code = `import dayjs from 'dayjs/esm/index';`;

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

