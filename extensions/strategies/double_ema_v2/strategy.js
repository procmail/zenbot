var z = require('zero-fill')
  , n = require('numbro')

module.exports = function container (get, set, clear) {
  return {
    name: 'double_ema_v2',
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

        // Get the gradient of the trend_ema1 line for the previous 2 periods
        s.period.trend_ema1_prev_gradient1 = null
        if (s.lookback[0] && s.lookback[2]) {
            var trend_ema1_prev_gradient1 = s.lookback[0].trend_ema1 - s.lookback[2].trend_ema1
            s.period.trend_ema1_prev_gradient1 = trend_ema1_prev_gradient1
        }
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

        // If macd isn't ready, don't do anything.
        if(typeof s.period.macd_histogram !== 'number') {
            return cb()
        }
        if (s.period.trend_ema1_prev_gradient1 == null) {
            return cb()
        }

        // if (s.period.macd_histogram <= s.options.macd_threshold * -1) {
        if (s.lookback[0].macd_histogram <= 0.05) {
            setDowntrend(s)
            return cb()
        }

        // if we are in a downward ema1 line, it's a downtrend.
        // if (s.period.trend_ema1_prev_gradient1 == null || s.period.trend_ema1_prev_gradient2 == null) {
        if (s.period.trend_ema1_prev_gradient1 <= 0) {
            setDowntrend(s)
            return cb()
        }

        if (s.lookback[0].trend_ema1 > s.lookback[0].trend_ema2) {
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
        var colorGradient1 = 'gray'

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
        if (s.period.trend_ema1_prev_gradient1 > 0) {
            colorGradient1 = 'green'
        }
        else if (s.period.trend_ema1_prev_gradient1 <= 0) {
            colorGradient1 = 'red'
        }

        if (s.lookback[0]) {
            cols.push(z(8, n(s.lookback[0].trend_ema1 - s.lookback[0].trend_ema2).format('0.0000'), ' ')[colorEma])
            cols.push(z(8, n(s.period.macd_histogram).format('0.0000'), ' ')[colorMacd])
            if (s.period.trend_ema1_prev_gradient1 == null) {
                cols.push(z(8, 'NA', ' ')[colorGradient1])
            }
            else {
                cols.push(z(8, n(s.period.trend_ema1_prev_gradient1).format('0.0000'), ' ')[colorGradient1])
            }
        }
        return cols
    }
  }
}
