module.exports = {
  _ns: 'zenbot',

  'strategies.double_ema_v2': require('./strategy'),
  'strategies.list[]': '#strategies.double_ema_v2'
}
