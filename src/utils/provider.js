import { JsonRpcProvider } from '@ethersproject/providers'
import networks from '@/helpers/networks.json'

const providers = {}

export default function getProvider (network) {
  const url = networks[network].rpc[0]
  if (!providers[network]) providers[network] = new JsonRpcProvider(url, networks[network])
  return providers[network]
}
