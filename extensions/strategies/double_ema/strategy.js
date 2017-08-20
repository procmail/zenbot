var z = require('zero-fill')
  , n = require('numbro')

module.exports = function container (get, set, clear) {
  return {
    name: 'double_ema',
    description: 'Buy when trend_ema1 > trend_ema2 and sell when trend_ema1 < trend_ema2.',

    getOptions: function () {
      this.option('period', 'period length', String, '2m')
      this.option('min_periods', 'min. number of history periods', Number, 52)
      this.option('trend_ema1', 'number of periods for trend EMA1', Number, 10)
      this.option('trend_ema2', 'number of periods for trend EMA2', Number, 20)
      this.option('ema_diff_threshold', 'Threshold between the difference of ema1 and ema2 that we are willing to accept', Number, 0.05)
      this.option('macd_threshold', 'Minimum of the Macd number that we are willing to accept, which we will convert to a negative number', Number, 0.005)
    },

    calculate: function (s) {
        get('lib.ema')(s, 'trend_ema1', s.options.trend_ema1)
        get('lib.ema')(s, 'trend_ema2', s.options.trend_ema2)
        get('lib.ta_macd')(s,'macd','macd_histogram','macd_signal', 12, 26, 9)
    //   if (s.period.trend_ema1 && s.lookback[0] && s.lookback[0].trend_ema1) {
    //     s.period.trend_ema_rate = (s.period.trend_ema1 - s.lookback[0].trend_ema1) / s.lookback[0].trend_ema1 * 100
    //   }
    },

    onPeriod: function (s, cb) {
        if (!s.lookback[0]) {
            return cb()
        }

        function setUptrend(s) {
            if (s.trend !== 'up') {
                s.acted_on_trend = false
            }
            s.trend = 'up'
            if (!s.acted_on_trend) {
                s.signal = 'buy'
            }
            else {
                s.signal = null
            }
        }

        function setDowntrend(s) {
            if (s.trend !== 'down') {
                s.acted_on_trend = false
            }
            s.trend = 'down'
            if (!s.acted_on_trend) {
                s.signal = 'sell'
            }
            else {
                s.signal = null
            }
        }

        // if (s.period.macd_histogram <= s.options.macd_threshold * -1) {
        if (s.period.macd_histogram <= 0) {
            setDowntrend(s)
            return cb()
        }

        if (s.lookback[0].trend_ema1 > s.lookback[0].trend_ema2) {
            // if (s.period.macd_histogram > parseFloat(s.options.macd_threshold * -1)) {
            setUptrend(s)
        }
        else if (s.lookback[0].trend_ema1 - s.lookback[0].trend_ema2 <= s.options.ema_diff_threshold * -1) {
            setDowntrend(s)
        }
      cb()
    },

    onReport: function (s) {
      var cols = []
    //   if (typeof s.period.trend_ema_stddev === 'number') {
        var colorEma = 'grey'
        var colorMacd = 'grey'
        if (s.lookback[0] && s.lookback[0].trend_ema1 > s.lookback[0].trend_ema2) {
          colorEma = 'green'
        }
        else if (s.lookback[0] && (s.lookback[0].trend_ema1 - s.lookback[0].trend_ema2 > s.options.ema_diff_threshold * -1)) {
          colorEma = 'green'
        }
        else if (s.lookback[0] && s.lookback[0].trend_ema1 <= s.lookback[0].trend_ema2) {
          colorEma = 'red'
        }
        if (s.period.macd_histogram > 0) {
          colorMacd = 'green'
        }
        else {
          colorMacd = 'red'
        }
        if (s.lookback[0]) {
            // cols.push(z(11, n(s.lookback[0].trend_ema1).format('00000.0000'), ' ')['yellow'])
            // cols.push(z(11, n(s.lookback[0].trend_ema2).format('00000.0000'), ' ')['yellow'])
            cols.push(z(8, n(s.lookback[0].trend_ema1 - s.lookback[0].trend_ema2).format('0.0000'), ' ')[colorEma])
            cols.push(z(8, n(s.period.macd_histogram).format('0.0000'), ' ')[colorMacd])



        }
    //   }
    //   else {
    //     if (s.period.trend_ema_stddev) {
    //       cols.push('                  ')
    //     }
    //     else {
    //       cols.push('         ')
    //     }
    //   }
      return cols
    }
  }
}
