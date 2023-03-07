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
