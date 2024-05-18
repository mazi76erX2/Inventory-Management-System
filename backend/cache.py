import os
import aioredis
import json
from typing import Optional


class RedisCache:
    def __init__(self, url: str):
        self.url = url
        self.redis = aioredis.from_url(url, encoding="utf-8", decode_responses=True)

    async def get(self, key: str) -> Optional[str]:
        return await self.redis.get(key)

    async def set(self, key: str, value: str, expire: int = 3600):
        await self.redis.set(key, value, ex=expire)

    async def delete(self, key: str):
        await self.redis.delete(key)

redis_cache = RedisCache(os.getenv("REDIS_URL"))
