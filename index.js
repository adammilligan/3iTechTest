// решение на второе задание

const encode = input => [...input]
  .map((x, i) => [x.charCodeAt(0), i])
  .sort()
  .flatMap(x => x)
  .join('.')
  .match(/./g)
  .flatMap((x, i) => new Array(x == '.' ? 1 : 2 + x * 2).fill((1 + i) % 2))
  .join('')
  .replace(/(([01])\2*)/g, x => `${(+x ? '.' : '-')}${x.length}`)

const decode = string => string
  .split(/(\.\d+|-?\d+)/)
  .filter(Boolean)
  .map((el) => el[0] === '.' ? new Array(+el.match(/\d+/g)).fill(1) : new Array(+el.match(/\d+/g)).fill(0))
  .flatMap(x => x)
  .join('')
  .match(/(1+|0+)/g)
  .map((x) => +x.length > 1 ? (x.length - 2) / 2 : '.')
  .join('')
  .split('.')
  .reduce((acc, curr, i, arr) => {
    if (i % 2 === 0) {
      acc.push([curr, arr[i + 1]]);
    }
    return acc;
  }, [])
  .sort((a, b) => a[1] - b[1])
  .map(x => String.fromCharCode(x[0]))
  .join('')
