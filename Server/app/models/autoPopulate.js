import { randProduct, randFloat } from '@ngneat/falso';



const randomItems = [...Array(100)].map((items) => (
    {
      name: randProduct().title,
      description: randProduct().description,
      price: faker.internet.userName(),
      rating_rate: randFloat({ min: 0, max: 4, fraction: 2 }),
      rating_count: randNumber({ min: 1000, max: 10000}),
      category: randProduct().category,
    }
  ))

  const fiveVendors = [
    {
        city:"Toronto",
        latitude: 43.674583 ,
        longitude: -79.490027,
    },
    {
        city:"Montreal",
        latitude:45.520188,
        longitude:-73.609483,
    },
    {
        city:"Chicago",
        latitude:41.739973,
        longitude:-87.702197,
    },
    {
        city:"Oak Hill",
        latitude:36.076834,
        longitude:-86.788773,
    },
    {
        city:"Columbus",
        latitude:39.939403,
        longitude:-82.980282,
    }
  ]
const randomInventories = [...Array(100)].map((vendors) => (
    {
      vendor_id: randNumber({ min: 0, max: 4}) ,
      item_id: randNumber({ min: 0, max: 99}),
      stock: randNumber({ min: 0, max: 500}),
      unitsSold: randNumber({ min: 5, max: 5000 }) 
    }
  ))