module.exports = {
  _ns: 'zenbot',

  'strategies.double_ema': require('./strategy'),
  'strategies.list[]': '#strategies.double_ema'
}
