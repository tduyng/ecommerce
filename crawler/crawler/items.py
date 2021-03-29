# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class AdoramaItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    brand = scrapy.Field()
    category = scrapy.Field()
    name = scrapy.Field()
    description = scrapy.Field()
    image = scrapy.Field()
    price = scrapy.Field()
    pass
