# vite-plugin-antd-dayjs
一个 Day.js 的 Vite 插件，用于替换 Ant Design 的 Moment.js。

## Usage 使用方法

0. 安装 `npm i dayjs --save`。
1. 安装 `npm i vite-plugin-moment-to-dayjs --save-dev`。
2. 更新 vite 配置。

## Example 示例

```js
// vite.config.js
import vitePluginMomentToDayjs from 'vite-plugin-moment-to-dayjs';

export default defineConfig({
  // ...
  plugins: [
    // ...
    vitePluginMomentToDayjs()
  ]
});

// main.js
// 更改语言
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

```

### Configuration 配置

默认无需额外配置，除非有特殊需要。

| Attribute      | Description          | Type         | Accepted Values  | Default  |
| ---------------| ---------------------| -------------| ---------------- | ------   |
| plugins        | 用到的dayjs插件       | Array[string]| 所有dayjs插件     | null       |
| preset         | 预设的插件            | String       | 'antd'｜'antdv3'           | 'antdv3'   |

'antd' 预设包含以下插件，并开启了‘替换Moment’配置，你可以通过 plugin 选项来配置自定义的插件组合及‘替换Moment’配置。
```
[
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
]
```

### Notice 说明

- Day.js 是一个只有 2kb 的轻量级时间库，但为了完成对 moment.js 和 Antd 代码的替换，我们需要引入一些特殊的插件，这会使最终的体积变成 4.19 kb （但仍然很小呀😀 ）
- 如果是在 Ant Design 3.x 项目中使用了 `antdv3` 配置，请注意： Day.js 被设计成不可变的对象，但是为了完成对 moment.js 的替换，必须要引入一个 🚨 `BadMutable` 🚨插件让其变成可变对象，这并不是一个好的选择，但为了兼容也没有更好的办法。当使用这个插件后，所有的 setter 都会更新当前实例。
- 代码和文档都改自原作者 iamkun 的 webpack 插件，我只是改成了 vite 插件。
