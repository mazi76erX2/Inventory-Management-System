"""
Description: This file contains the RedisCache class which is used to
interact with the Redis cache.
"""

from typing import Optional

import redis

from .config import REDIS_URL


class RedisCache:
    """Redis cache class"""

    def __init__(self, url: str):
        self.url = url
        self.redis = redis.from_url(url, encoding="utf-8", decode_responses=True)

    async def get(self, key: str) -> Optional[str]:
        """Get value from Redis cache"""
        return await self.redis.get(key)

    async def set(self, key: str, value: str, expire: int = 3600):
        """Set value in Redis cache"""
        await self.redis.set(key, value, ex=expire)

    async def delete(self, key: str):
        """Delete value from Redis cache"""
        await self.redis.delete(key)


redis_cache = RedisCache(REDIS_URL)
