import scrapy


class VatanbilgisayarAppleSpider(scrapy.Spider):
    name = 'vatanbilgisayar_apple'
    allowed_domains = ['vatanbilgisayar.com']
    start_urls = ['https://www.vatanbilgisayar.com/apple/cep-telefonu-modelleri/?page=1',
    'https://www.vatanbilgisayar.com/apple/cep-telefonu-modelleri/?page=2',
    'https://www.vatanbilgisayar.com/apple/cep-telefonu-modelleri/?page=3',
    'https://www.vatanbilgisayar.com/apple/cep-telefonu-modelleri/?page=4',
    'https://www.vatanbilgisayar.com/apple/cep-telefonu-modelleri/?page=5',
    'https://www.vatanbilgisayar.com/apple/cep-telefonu-modelleri/?page=6'
    ]
      

    def parse(self, response):
        productName =  response.xpath("//a[@class='product-list__link']/div[@class='product-list__product-name']/text()").extract()
        productPrice = response.xpath("//div[@class='product-list product-list--list-page']/div[@class='product-list__content']/div[@class='product-list__cost']/span[@class='product-list__price']/text()").extract()
        productImage = response.xpath("//div[@class='slider-img']/img[@class='lazyimg']/@data-src").extract()
        redirectPage = response.css('.product-list__link').xpath('@href').getall()
        
        
        
        row_data = zip(productName,productPrice,productImage,redirectPage)
        for product in row_data:
            scraped_info = {
                'page':response.url.strip(),
                'productName' : product[0].strip(),
                'productPrice' : product[1].strip(),
                'productImage' : product[2].strip(),
                'redirectPage' : product[3].strip()
            }
            yield scraped_info

        


        
        



