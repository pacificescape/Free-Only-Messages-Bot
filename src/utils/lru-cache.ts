import LRU from 'lru-cache'

const ONE_HOUR = 3_600_000;

const options = {
  ttl: ONE_HOUR,
}

const lruCache = new LRU(options)

export { lruCache }