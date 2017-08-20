# API Keys

## bitfinex

API key
F9SDY9ctEAH2TXM2uqDbYiuAvMGMcEGYwuKCud1pkiK
API key secret
ODZMBl2zfVmDoB1Glao1udvvUjJy549Zp4o91J4hWNO

Bittrex command:

zenbot trade bittrex.ETH-USDT --paper --period=1m --min_periods=10 --trend_ema1=10 --trend_ema2=20 --neutral_rate=0.15 --reset_profit --asset_capital=10 --currency_capital=0 --strategy=double_ema --buy_pct=50 --sell_pct=90 --profit_stop_enable_pct=10 --profit_stop_pct=4

# Important When Starting Bots
### If you start with more assets than currency
Start bot when you feel the price of the asset is high, in case the bot starts to sell, it will then sell at such a high price. But do factor in the `--min_periods` setting, which is 52 for `trend_ema` and `trend_ema_fed`.

### If you start with more currency than asset.
Start bot when you feel the price of the asset is low, in case the bot starts to sell. Factor in the `--min_periods` setting, which is 52 for `trend_ema` and `trend_ema_fed`.

### Identify the trend
If downwards trend, `--profit_stop_enable_pct=10 --profit_stop_pct=4` is better at retaining profits.

### Always monitor the bot and run a paper trade side by side with a live trading
If we see the % going red, switch immediately to another suitable strategy (after backfilling to current data and running a simulation of 1 day).

# Commands used in tests
## Infatrus's Settings
1. `
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit
`
2. `
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit --profit_stop_enable_pct=10 --profit_stop_pct=4
`

## Krilson's Settings
1. `
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=10 --trend_ema=10 --neutral_rate=0.15  --strategy=trend_ema --reset_profit
`
2. `
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=10 --trend_ema=10 --neutral_rate=0.15  --strategy=trend_ema --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1 --reset_profit
`

## Macd Settings
`
./zenbot.sh trade bittrex.XRP-USDT --paper --strategy=macd --ema_short_period=10 --ema_long_period=21 --reset_profit --asset_capital=20 --currency_capital=0
`

## Fed's Settings and `trend_ema_fed`
1. `
./zenbot.sh trade bitstamp.eth-usd --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed
`

## My Settings and `double_ema_v2`
1. `
./zenbot.sh trade bittrex.xrp-usdt --paper --period=3m --min_periods=10 --trend_ema1=10 --trend_ema2=20 --asset_capital=0 --currency_capital=1000 --reset_profit --strategy=double_ema_v2
`
2. `
./zenbot.sh trade bittrex.xrp-usdt --paper --period=3m --min_periods=10 --trend_ema1=10 --trend_ema2=20 --asset_capital=0 --currency_capital=1000 --buy_pct=50 -sell_pct=90 --reset_profit --strategy=double_ema_v2
`


# Trend_ema_fed and Macd Simulations

## Fed's trend_ema and options
### Sim Results
##### 14 Days - Bitfinex.XRP-USD: **+40.30%**
`
{                                                                      
  "asset_capital": 0,                                                                                                                 
  "avg_slippage_pct": 0.045,                                          
  "buy_pct": 99,                                                                                                                     
  "buy_stop_pct": 0,                                                   
  "currency_capital": 1000,                                                                                                           
  "days": 14,                                                          
  "markup_pct": 0.2,                                                                                                                  
  "max_sell_loss_pct": 25,                                             
  "max_slippage_pct": "2",                                                                                                            
  "min_periods": 52,                                                   
  "mode": "sim",                                                                                                                      
  "neutral_rate": "auto",                                             
  "order_adjust_time": 5000,                                                                                                           
  "order_type": "maker",                                               
  "oversold_rsi": 10,                                                                                                                  
  "oversold_rsi_periods": 14,                                         
  "paper": true,                                                                                                                        
  "period": "15s",            
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,     
  "rsi_periods": 14,             
  "selector": "bitfinex.XRP-USD",
  "sell_pct": 99,          
  "sell_stop_pct": 0,  
  "show_options": true,
  "start": 1501804800000,
  "stats": false,         
  "strategy": "trend_ema_fed",
  "trend_ema": 26,        
  "verbose": false       
}                           
end balance: 1403.00513342 (40.30%)
buy hold: 916.35111876 (-8.36%)
vs. buy hold: 53.11%         
710 trades over 16 days (avg 44.38 trades/day)
win/loss: 201/190
error rate: 48.59%            
wrote simulations/sim_result_bitfinex.XRP-USD_170818_181828_UTC.html
`

##### 30 Days - Bitfinex.XRP-USD: **+4692.38%**
`
{
  "asset_capital": 0,
  "avg_slippage_pct": 0.045,
  "buy_pct": 99,
  "buy_stop_pct": 0,
  "currency_capital": 1000,
  "days": 30,
  "markup_pct": 0.2,
  "max_sell_loss_pct": 25,
  "max_slippage_pct": "2",
  "min_periods": 52,
  "mode": "sim",
  "neutral_rate": "auto",
  "order_adjust_time": 5000,
  "order_type": "maker",
  "oversold_rsi": 10,
  "oversold_rsi_periods": 14,
  "paper": true,
  "period": "15s",
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,
  "rsi_periods": 14,
  "selector": "bitfinex.ETH-USD",
  "sell_pct": 99,
  "sell_stop_pct": 0,
  "show_options": true,
  "start": 1500422400000,
  "stats": false,
  "strategy": "trend_ema_fed",
  "trend_ema": 26,
  "verbose": false
}
end balance: 47923.78726781 (4692.38%)
buy hold: 1321.49378315 (32.15%)
vs. buy hold: 3526.49%
2157 trades over 31 days (avg 69.58 trades/day)
win/loss: 890/218
error rate: 19.68%
wrote simulations/sim_result_bitfinex.ETH-USD_170818_184559_UTC.h
`

##### 1 Day - Bitfinex.ETH-USD: **+5.77%**
`
{
  "asset_capital": 0,
  "avg_slippage_pct": 0.045,
  "buy_pct": 99,
  "buy_stop_pct": 0,
  "currency_capital": 1000,
  "days": 1,
  "markup_pct": 0.2,
  "max_sell_loss_pct": 25,
  "max_slippage_pct": "2",
  "min_periods": 52,
  "mode": "sim",
  "neutral_rate": "auto",
  "order_adjust_time": 5000,
  "order_type": "maker",
  "oversold_rsi": 10,
  "oversold_rsi_periods": 14,
  "paper": true,
  "period": "15s",
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,
  "rsi_periods": 14,
  "selector": "bitfinex.ETH-USD",
  "sell_pct": 99,
  "sell_stop_pct": 0,
  "show_options": true,
  "start": 1502928000000,
  "stats": false,
  "strategy": "trend_ema_fed",
  "trend_ema": 26,
  "verbose": false
}
end balance: 1057.67906085 (5.77%)
buy hold: 1008.96206061 (0.90%)
vs. buy hold: 4.83%
54 trades over 3 days (avg 18.00 trades/day)
win/loss: 24/5
error rate: 17.24%
wrote simulations/sim_result_bitfinex.ETH-USD_170818_190057_UTC.html
`

##### 14 Days - Bitfinex.ETH-USD: **+338.42%**
`
{                
  "asset_capital": 0,         
  "avg_slippage_pct": 0.045,
  "buy_pct": 99,  
  "buy_stop_pct": 0,
  "currency_capital": 1000,           
  "days": 14,                   
  "markup_pct": 0.2,  
  "max_sell_loss_pct": 25,                     
  "max_slippage_pct": "2",
  "min_periods": 52,
  "mode": "sim",                                                    
  "neutral_rate": "auto",
  "order_adjust_time": 5000,
  "order_type": "maker",
  "oversold_rsi": 10,
  "oversold_rsi_periods": 14,
  "paper": true,
  "period": "15s",
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,
  "rsi_periods": 14,
  "selector": "bitfinex.ETH-USD",
  "sell_pct": 99,
  "sell_stop_pct": 0,
  "show_options": true,
  "start": 1501804800000,
  "stats": false,
  "strategy": "trend_ema_fed",
  "trend_ema": 26,
  "verbose": false
}
end balance: 4384.23829879 (338.42%)
buy hold: 1352.36019042 (35.24%)
vs. buy hold: 224.19%
886 trades over 16 days (avg 55.38 trades/day)
win/loss: 376/79
error rate: 17.36%
wrote simulations/sim_result_bitfinex.ETH-USD_170818_182626_UTC.html
`

##### Flags: `
--max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed
`

##### Example
- `
./zenbot.sh trade bitstamp.eth-usd --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed
`

##### Notes
- `--profit_stop_enable_pct=10 --profit_stop_pct=4` have no effect when tested with `--days 10` and `--days 1`.

### Macd Settings

### Sim Results
##### 14 Days - Bitfinex.XRP-USD: **-13.02%**
`
{                                                                      
  "asset_capital": 0,                                                                                                                 
  "avg_slippage_pct": 0.045,                                          
  "buy_pct": 99,                                                                                                                      
  "buy_stop_pct": 0,
  "currency_capital": 1000,   
  "days": 14,               
  "down_trend_threshold": 0,
  "ema_long_period": 21,
  "ema_short_period": 10,             
  "markup_pct": 0,              
  "max_sell_loss_pct": 25,
  "max_slippage_pct": 5,                       
  "min_periods": 52,      
  "mode": "sim",    
  "order_adjust_time": 5000,                                        
  "order_type": "maker",
  "overbought_rsi": 70,
  "overbought_rsi_periods": 25,
  "paper": true,
  "period": "1h",
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,
  "rsi_periods": 25,
  "selector": "bitfinex.XRP-USD",
  "sell_pct": 99,
  "sell_stop_pct": 0,
  "show_options": true,
  "signal_period": 9,
  "start": 1501804800000,
  "stats": false,
  "strategy": "macd",
  "up_trend_threshold": 0,
  "verbose": false
}
end balance: 869.75846876 (-13.02%)
buy hold: 917.50919118 (-8.25%)
vs. buy hold: -5.20%
34 trades over 18 days (avg 1.89 trades/day)
win/loss: 5/12
error rate: 70.59%
wrote simulations/sim_result_bitfinex.XRP-USD_170818_182021_UTC.html
`

##### 1 Day - Bitfinex.ETH-USD: **-0.02%**
`
{
  "asset_capital": 0,
  "avg_slippage_pct": 0.045,
  "buy_pct": 99,
  "buy_stop_pct": 0,
  "currency_capital": 1000,
  "days": 1,
  "down_trend_threshold": 0,
  "ema_long_period": 21,
  "ema_short_period": 10,
  "markup_pct": 0,
  "max_sell_loss_pct": 25,
  "max_slippage_pct": 5,
  "min_periods": 52,
  "mode": "sim",
  "order_adjust_time": 5000,
  "order_type": "maker",
  "overbought_rsi": 70,
  "overbought_rsi_periods": 25,
  "paper": true,
  "period": "1h",
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,
  "rsi_periods": 25,
  "selector": "bitfinex.ETH-USD",
  "sell_pct": 99,
  "sell_stop_pct": 0,
  "show_options": true,
  "signal_period": 9,
  "start": 1502928000000,
  "stats": false,
  "strategy": "macd",
  "up_trend_threshold": 0,
  "verbose": false
}
end balance: 999.83500883 (-0.02%)
buy hold: 1008.96206061 (0.90%)
vs. buy hold: -0.90%
2 trades over 5 days (avg 0.40 trades/day)
win/loss: 1/0
error rate: 0.00%
wrote simulations/sim_result_bitfinex.ETH-USD_170818_190220_UTC.html
`

##### 14 Days - Bitfinex.ETH-USD: **+23.14%**
`
{                                                                                                                                     
  "asset_capital": 0,                                                  
  "avg_slippage_pct": 0.045,                                                                                                          
  "buy_pct": 99,                                                       
  "buy_stop_pct": 0,                                                                                                                  
  "currency_capital": 1000,                                           
  "days": 14,                                                                                                                        
  "down_trend_threshold": 0,                                           
  "ema_long_period": 21,                                                                                                              
  "ema_short_period": 10,                                              
  "markup_pct": 0,                                                                                                                    
  "max_sell_loss_pct": 25,                                             
  "max_slippage_pct": 5,                                                                                                              
  "min_periods": 52,                                                   
  "mode": "sim",                                                                                                                      
  "order_adjust_time": 5000,                                          
  "order_type": "maker",                                                                                                               
  "overbought_rsi": 70,                                                
  "overbought_rsi_periods": 25,                                                                                                        
  "paper": true,                                                      
  "period": "1h",                                                                                                                       
  "profit_stop_enable_pct": 0,
  "profit_stop_pct": 1,
  "rsi_periods": 25,        
  "selector": "bitfinex.ETH-USD",
  "sell_pct": 99,   
  "sell_stop_pct": 0,      
  "show_options": true,
  "signal_period": 9,
  "start": 1501804800000,
  "stats": false,         
  "strategy": "macd",
  "up_trend_threshold": 0,
  "verbose": false       
}                           
end balance: 1231.40565192 (23.14%)
buy hold: 1352.36019042 (35.24%)
vs. buy hold: -8.94%         
30 trades over 18 days (avg 1.67 trades/day)
win/loss: 7/8     
error rate: 53.33%            
wrote simulations/sim_result_bitfinex.ETH-USD_170818_182218_UTC.html
`

##### Flags: `
--strategy=macd --ema_short_period=10 --ema_long_period=21
`

##### Examples
- `
./zenbot.sh trade bitstamp.eth-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21 --reset_profit --asset_capital=20 --currency_capital=0
`
- `
./zenbot.sh trade bittrex.xrp-usdt --paper --strategy=macd --ema_short_period=10 --ema_long_period=21 --reset_profit --asset_capital=0 --currency_capital=1000
`

# `backtester.js` Commands

### Individual Commands
1. `
./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --strategy=trend_ema_fed --max_slippage_pct 2 --markup_pct 0.2 --order_adjust_time 5000
`
2. `
./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21 --reset_profit --asset_capital=20 --currency_capital=0
`
3. `
./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --trend_ema1=10 --trend_ema2=20 --buy_pct=50 -sell_pct=90 --strategy=double_ema_v2
`
4. `
./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --strategy=trend_ema
`
5. ` ./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1
`

### Combined Into One Long Command
`
./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21 --reset_profit --asset_capital=20 --currency_capital=0; ./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --trend_ema1=10 --trend_ema2=20 --buy_pct=50 -sell_pct=90 --strategy=double_ema_v2; ./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --strategy=trend_ema; ./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1; ./scripts/auto_backtester/backtester.js bitfinex.xrp-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21; ./scripts/auto_backtester/backtester.js bitfinex.xrp-usd --paper --trend_ema1=10 --trend_ema2=20 --buy_pct=50 -sell_pct=90 --strategy=double_ema_v2; ./scripts/auto_backtester/backtester.js bitfinex.xrp-usd --paper --strategy=trend_ema; ./scripts/auto_backtester/backtester.js bitfinex.xrp-usd --paper --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1; ./scripts/auto_backtester/backtester.js bitfinex.ltc-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21; ./scripts/auto_backtester/backtester.js bitfinex.ltc-usd --paper --trend_ema1=10 --trend_ema2=20 --buy_pct=50 -sell_pct=90 --strategy=double_ema_v2; ./scripts/auto_backtester/backtester.js bitfinex.ltc-usd --paper --strategy=trend_ema; ./scripts/auto_backtester/backtester.js bitfinex.ltc-usd --paper --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1; ./scripts/auto_backtester/backtester.js bitfinex.iot-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21; ./scripts/auto_backtester/backtester.js bitfinex.iot-usd --paper --trend_ema1=10 --trend_ema2=20 --buy_pct=50 -sell_pct=90 --strategy=double_ema_v2; ./scripts/auto_backtester/backtester.js bitfinex.iot-usd --paper --strategy=trend_ema; ./scripts/auto_backtester/backtester.js bitfinex.iot-usd --paper --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1; ./scripts/auto_backtester/backtester.js bitfinex.xmr-usd --paper --strategy=macd --ema_short_period=10 --ema_long_period=21; ./scripts/auto_backtester/backtester.js bitfinex.xmr-usd --paper --trend_ema1=10 --trend_ema2=20 --buy_pct=50 -sell_pct=90 --strategy=double_ema_v2; ./scripts/auto_backtester/backtester.js bitfinex.xmr-usd --paper --strategy=trend_ema; ./scripts/auto_backtester/backtester.js bitfinex.xmr-usd --paper --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1; ./scripts/auto_backtester/backtester.js bitfinex.eth-usd --paper --max_slippage_pct 2 --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed; ./scripts/auto_backtester/backtester.js bitfinex.xrp-usd --paper --max_slippage_pct 2 --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed; ./scripts/auto_backtester/backtester.js bitfinex.ltc-usd --paper --max_slippage_pct 2 --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed; ./scripts/auto_backtester/backtester.js bitfinex.iot-usd --paper --max_slippage_pct 2 --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed; ./scripts/auto_backtester/backtester.js bitfinex.xmr-usd --paper --max_slippage_pct 2 --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed;
`

# Things to try

## Other Altcoins
- Neo
- XRP


## Other parameters
- --sell_pct=50??
- --neutral_rate 0.3

## Incorporate other indicators
- Trend EMA angle
- Distance between the 2 EMA lines even if ema1 > ema2
- Cases where the ema_difference or macd just goes into negative then bounces up again. This triggers a sell.

## Use a % to sell instead of waiting for indicator signals?

# Concerns
- Does it take into account transaction fees?

# What seems to work

### mine (not working?)

`
zenbot trade bittrex.XRP-USDT --paper --period=3m --min_periods=10 --trend_ema1=10 --trend_ema2=20 --asset_capital=0 --currency_capital=1000 --buy_pct=50 -sell_pct=90 --reset_profit --strategy=double_ema_v2
`

##### Results
- 0% on XRP-USDT after hours.

### infatrus
##### No Trailing Stop Loss
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit
`
##### With Trailing Stop Loss
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit --profit_stop_enable_pct=10 --profit_stop_pct=4  
`
##### Results
- Paper Trade - works well with NEO-USDT. It seems with the trailing stop loss, it works slightly better.
- Simulation - with 10 days ETH-USD, trailing stop loss: 7.29%, no stop loss: 9.20%

### krilson
##### No Stop Loss
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=10 --trend_ema=10 --neutral_rate=0.15  --strategy=trend_ema --reset_profit
`
##### With A Stop Loss
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=10 --trend_ema=10 --neutral_rate=0.15  --strategy=trend_ema --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1 --reset_profit
`
##### Results
- Works ok with XRP-USDT (+1% after hours), both with and without stop loss. With stop loss, it is safer during downturns but seems to make less during upturn. Perhaps need to tweak the `max_sell_loss_pct`?
- Needs testing with a *trailing* stop loss.

### Macd
`
./zenbot.sh trade bittrex.xrp-usdt --paper --strategy=macd --ema_short_period=10 --ema_long_period=21 --reset_profit
`
##### Results
- Paper trade - 0% on XRP-USDT after hours.
- Simulation - 10 days ETH-USD. +8.35% for both with and without trailing stop loss.

### Fed's `trend_ema_fed`
`
./zenbot.sh trade bitstamp.eth-usd --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed
`
- Seems to work on ETH-USDT (+2.5% after hours, and it is the only strategy that is green).
- Does not seem to work well with XRP-USDT (-2.8% after hours).

# Paper Trades
## Bittrex.LTC-USDT
1. +3.3%
`
./zenbot.sh trade bittrex.ltc-usdt --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed --reset_profit --asset_capital=0 --currency_capital=1000
`
2. +1.1%
`
./zenbot.sh trade bittrex.ltc-usdt --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed --reset_profit --asset_capital=0 --currency_capital=1000
`

## Bittrex.XRP-USDT
1. +9.5%
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit --profit_stop_enable_pct=10 --profit_stop_pct=4
`
2. +8.8%
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit
`
3. +6.2%
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=10 --trend_ema=10 --neutral_rate=0.15  --strategy=trend_ema --reset_profit
`
4. +4.1%
`
./zenbot.sh trade bittrex.XRP-USDT --paper --period=2m --min_periods=10 --trend_ema=10 --neutral_rate=0.15  --strategy=trend_ema --buy_pct=50 --sell_pct=90 --max_sell_loss_pct=0.1 --reset_profit
`
5. +0.3%
`
./zenbot.sh trade bittrex.xrp-usdt --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed --reset_profit --asset_capital=00 --currency_capital=1000
`

## Bitstamp.ETH-USD
1. +2.5%
`
./zenbot.sh trade bittrex.neo-usdt --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed --reset_profit --asset_capital=0 --currency_capital=1000
`
2. +5.9%
`
 ./zenbot.sh trade bittrex.neo-usdt --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit
`
3. +5.0%
`
./zenbot.sh trade bittrex.neo-usdt --paper --period=2m --min_periods=3 --trend_ema=2 --oversold_rsi_periods 26 --oversold_rsi 30 --neutral_rate 0.7 --strategy=trend_ema --reset_profit --asset_capital=0 --currency_capital=1000 --profit_stop_enable_pct=10 --profit_stop_pct=4
`

## Bittrex.NEO-USDT
1. +12.0%
`
./zenbot.sh trade bittrex.neo-usdt --paper --max_slippage_pct 2 --period=15s --markup_pct 0.2 --order_adjust_time 5000 --strategy=trend_ema_fed --reset_profit --asset_capital=0 --currency_capital=1000
`
2.

---

---

zenbot trade bittrex.ETH-USDT --paper --period=1m --min_periods=60 --trend_ema=30 --neutral_rate=0.15 --reset_profit --asset_capital=24 --currency_capital=0

zenbot trade bittrex.ETH-USDT --paper --period=1m --min_periods=60 --trend_ema1=10--trend_ema2=20 --neutral_rate=0.15 --reset_profit --asset_capital=10 --currency_capital=0 --strategy=double_ema --buy_pct=50 --sell_pct=90 --profit_stop_enable_pct=10 --profit_stop_pct=4

zenbot trade bittrex.ETH-USDT --paper --period=1m --min_periods=60 --trend_ema=30 --neutral_rate=0.15 --reset_profit --asset_capital=24 --currency_capital=0 --strategy=trend_ema_v2
zenbot trade bittrex.ETH-USDT --paper --period=1m --min_periods=60 --trend_ema=30 --reset_profit --asset_capital=24 --currency_capital=0 --strategy=trend_ema_v2 --buy_pct=50 --sell_pct=90
zenbot trade bitfinex.ETH-USD --paper --period=5m --min_periods=60 --trend_ema=30 --reset_profit --asset_capital=24 --currency_capital=0 --strategy=trend_ema_v2 --buy_pct=50 --sell_pct=90
zenbot trade bitfinex.BTC-USD --paper --period=5m --min_periods=60 --trend_ema=10 --neutral_rate=0.15 --reset_profit --asset_capital=0 --currency_capital=2000 --strategy=trend_ema_v2 --buy_pct=50 --sell_pct=90 --profit_stop_enable_pct=10 --profit_stop_pct=4


zenbot trade bitfinex.ETH-USD --paper --period=1m --min_periods=60 --trend_ema1=10 --trend_ema2=20 --neutral_rate=0.15 --reset_profit --asset_capital=24 --currency_capital=0 --strategy=double_ema --buy_pct=50 --sell_pct=90 --profit_stop_enable_pct=10 --profit_stop_pct=4
zenbot trade bitfinex.ETH-USD --paper --period=1m --min_periods=60 --trend_ema1=10 --trend_ema2=20 --neutral_rate=0.15 --reset_profit --asset_capital=24 --currency_capital=0 --strategy=double_ema --buy_pct=99 --sell_pct=99 --profit_stop_enable_pct=10 --profit_stop_pct=4
