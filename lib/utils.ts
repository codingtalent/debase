export const scrollToArchor = (id: string) => {
  document?.querySelector(id)?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
}

export const formatDollar = (usd: number, minimumFractionDigits: number = 0) => (
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    style: 'currency',
    currency: 'USD'
  }).format(usd)
)

export const formatShortAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
