module.exports = {
  _ns: 'zenbot',

  'strategies.trend_ema_fed': require('./strategy'),
  'strategies.list[]': '#strategies.trend_ema_fed'
}
