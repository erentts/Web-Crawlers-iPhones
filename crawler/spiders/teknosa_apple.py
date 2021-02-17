import scrapy


class TeknosaAppleSpider(scrapy.Spider):
    name = 'teknosa_apple'
    allowed_domains = ['teknosa.com']
    start_urls = ['https://www.teknosa.com/iphone-ios-telefonlar-c-100001001/']

    def parse(self, response):
        productName = response.xpath("//div[@class='product-name']/a/span/text()").extract()
        productPrice = response.css('.price-tag::text').extract()
        productImage = response.xpath("//div[@class='product-image-item']/a/img/@src").extract()
        redirectPage = response.xpath("//div[@class='product-image-item']/a/@href").extract()

        row_data = zip(productName,productPrice,productImage,redirectPage)
        for product in row_data:
            scraped_info = {
                'page':response.url.strip(),
                'productName' : product[0].strip(),
                'productPrice' : product[1].strip().split(' ')[0],
                'productImage' : product[2].strip(),
                'redirectPage' : product[3].strip()
            }
            yield scraped_info