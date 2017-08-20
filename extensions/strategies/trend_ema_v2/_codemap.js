module.exports = {
  _ns: 'zenbot',

  'strategies.trend_ema_v2': require('./strategy'),
  'strategies.list[]': '#strategies.trend_ema_v2'
}
