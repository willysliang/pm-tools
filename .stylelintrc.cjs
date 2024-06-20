module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  custonSyntax: 'postcss-scss',
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-function-pattern': null, // 函数名不限制短横线命名，可以驼峰命名
    'scss/percent-placeholder-pattern': null, // 占位选择器不限制短横线命名，可以驼峰命名
    'scss/at-mixin-pattern': null, // mxin不限制短横线命名，可以驼峰命名
    'scss/no-global-function-names': null, // 忽略 mix 等公共函数名的调用
    'function-no-unknown': null,
    'selector-class-pattern': null,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    },
  ],
};
