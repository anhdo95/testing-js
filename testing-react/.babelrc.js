const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-transform-react-remove-prop-types'],
}
