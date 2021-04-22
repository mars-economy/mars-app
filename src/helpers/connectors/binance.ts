import LockConnector from '@snapshot-labs/lock/src/connector'

export default class Connector extends LockConnector {
  async connect () {
    let provider
    if (window['BinanceChain']) {
      provider = window['BinanceChain']
      try {
        await window['BinanceChain'].enable()
      } catch (e) {
        console.error(e)
        if (e.code === 4001) return
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider
    }
    return provider
  }

  async isLoggedIn () {
    const binance = await this.detect()
    if (!binance) return false
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return binance.isConnected()
  }

  async detect () {
    let handled = false

    return new Promise((resolve) => {
      if (window['BinanceChain']) {
        handleBinanceChain()
      } else {
        window.addEventListener(
          'binance#initialized',
          handleBinanceChain,
          { once: true }
        )

        setTimeout(() => {
          handleBinanceChain()
        }, 3000)
      }

      function handleBinanceChain () {
        if (handled) {
          return
        }
        handled = true

        window.removeEventListener('binance#initialized', handleBinanceChain)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { BinanceChain } = window

        if (BinanceChain) {
          resolve(BinanceChain)
        } else {
          const message = BinanceChain
            ? 'Non-MetaMask window.BinanceChain detected.'
            : 'Unable to detect window.BinanceChain.'
          console.log('message', message)
          resolve(null)
        }
      }
    })
  }
}
