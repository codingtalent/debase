export const scrollToArchor = (id: string) => {
  document?.querySelector(id)?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
}

export const formatDollar = (usd: number|string, minimumFractionDigits: number = 0) => (
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    style: 'currency',
    currency: 'USD'
  }).format(Number(usd))
)

export const formatShortAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

export function getGroupArray(list: any[], attr: string) {
  const map = new Map();
  list.forEach((item, index, arr) => {
    if (!map.has(item[attr])) {
      map.set(
        item[attr],
        arr.filter(a => a[attr] == item[attr])
      );
    }
  });
  return Array.from(map).map(item => [...item[1]]);
}

export function getGroupObject(list: any[], attr: string) {
  const map = new Map();
  list.forEach((item, index, arr) => {
    if (!map.has(item[attr])) {
      map.set(
        item[attr],
        arr.filter(a => a[attr] == item[attr])
      );
    }
  });
  return Object.fromEntries(Array.from(map).map(item => [item[0], item[1]]));
}

export function getLastProtocolDetailType(detailType: string[]): string{
  return [...detailType].pop() ?? ''
}
