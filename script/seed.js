// const {green, red} = require('chalk')
const faker = require('faker')

const db = require('../server/db')
const User = require('../server/db/models/user')
const Product = require('../server/db/models/products')
const Order = require('../server/db/models/order')
const Order_Product = require('../server/db/models/order_product')

// ---- seeding User ----------
let user_build = []

const normalUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
  email: 'user@graceshopper.com',
  password: '12345',
  isAdmin: false
}

const adminUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
  email: 'admin@graceshopper.com',
  password: '12345',
  isAdmin: true
}
user_build.push(normalUser)
user_build.push(adminUser)

for (let i = 0; i <= 110; i++) {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
    email: `${faker.name.firstName()}_${faker.name.lastName()}@${faker.internet.domainName()}`,
    password: '12345',
    isAdmin: false
  }
  user_build.push(user)
}

const users = user_build

// ---- seeding Product----------

let Product_build = [
  {
    name: 'Crinkle Leaf Plant',
    description:
      'This is a small plant has triangle shaped leaves that crinkle as they grow',
    imageUrl: './plants/crinkleLeaf.jpg',
    price: 999,
    quantity: 13,
    category: 'succulent'
  },
  {
    name: 'Calico Hearts',
    description:
      'This succulent is grey green in color and has deep purple speckles that are denser moving towards the edge of the leaves.The leaves are flat ovals.',
    imageUrl: './plants/calicoHeart.jpg',
    price: 1399,
    quantity: 13,
    category: 'succulent'
  },
  {
    name: 'Tiger Tooth Aloe',
    description:
      "This Aloe is a stacked rosette shape it is birght green with white oval like spots. When 'happily stressed' it turns reddish brown on its edges.",
    imageUrl: './plants/tigerTooth.jpg',
    price: 1299,
    quantity: 16,
    category: 'aloe'
  },
  {
    name: 'Christmas Carol',
    description:
      'This aloe is ont he smalle side, it forms a flatter rosette with green and red coloring. Its edges have smallow yellow bumps and wil flower with a red-pink flower in the fall.',
    imageUrl: './plants/christmasCarol.jpg',
    price: 1599,
    quantity: 18,
    category: 'aloe'
  },
  {
    name: 'Kiwi Succulent',
    description:
      'This rosette style succulent has pale yellow coes and green or pink edges. It also flowers during the summer with yellow blossoms.',
    imageUrl: './plants/kiwiSuc.jpg',
    price: 1299,
    quantity: 14,
    category: 'succulent'
  },
  {
    name: 'Domino Cactus',
    description:
      'A small globular cactus that looks unobtrusive however when it bloods it has a strikingg flower.',
    imageUrl: './plants/domino.jpg',
    price: 899,
    quantity: 13,
    category: 'cactus'
  },
  {
    name: 'Sunburst Succulent',
    description:
      'This is a veriegated branching succulent. It has white and green leaves with striped varigations. If left in full sun the edges will turn pink. This plant is monocarpic which means after it flowers the main body dies.',
    imageUrl: './plants/sunburst.jpg',
    price: 1299,
    quantity: 14,
    category: 'succulent'
  },
  {
    name: 'Doran Black',
    description:
      'This aloe is a hybrid with stunning white leaves with green amrks. It is easily propageted and grows happily in clumps. ',
    imageUrl: './plants/doranBlack.jpg',
    price: 1399,
    quantity: 18,
    category: 'aloe'
  },
  {
    name: 'Silver Ball Cactus',
    description:
      'This globular cactus is covered in medium length spines. They give this cactus a fuzzy look, However i would not pet it!',
    imageUrl: './plants/silver.jpg',
    price: 1399,
    quantity: 13,
    category: 'cactus'
  },
  {
    name: "Buhr's Aloe",
    description:
      'This is known as an evergreen Aloe it has tapered leaves and lacks the teeth common in Aloe. The leaves are green and red and are covered in white speckles. Sometimes it flowers in the fall.',
    imageUrl: './plants/buhrs.jpg',
    price: 799,
    quantity: 9,
    category: 'aloe'
  },
  {
    name: 'Parodia',
    description:
      "This is another globular cactus, it has longer spikes and is a flowering cactus. It's blossoms are vibrant in color and are usually yellow or orange but can be pink.",
    imageUrl: './plants/parodia.jpg',
    price: 899,
    quantity: 7,
    category: 'cactus'
  },
  {
    name: 'Twilight Zone',
    description:
      'This aloe hybrid is a dark deep green with leaves that look more like a Snake plant. The deep green contrasts beautifully against the bright white speckles it is coverred with. ',
    imageUrl: './plants/twilightZone.jpg',
    price: 899,
    quantity: 6,
    category: 'aloe'
  },
  {
    name: 'Green Ice',
    description:
      'This ALoe has chunky leaves that are thicka nd rowounded. It is simple and easy to grow cactus It is grey green in color leaning towards light grey.',
    imageUrl: './plants/greenIce.jpg',
    price: 599,
    quantity: 9,
    category: 'aloe'
  },
  {
    name: 'Mardi Gras Succulent',
    description:
      'This variegated succulent is yellow and green, however in cooler temperatues the edges turn bright pink and lime green giving it its name.',
    imageUrl: './plants/mardiGrasSuc.jpg',
    price: 1299,
    quantity: 14,
    category: 'succulent'
  },
  {
    name: 'Golden Pincushion',
    description:
      'This cactus is columnar though it is still thicker it has long spikes that are yellow/gold in color giving it a golden glow.',
    imageUrl: './plants/golden.jpg',
    price: 1299,
    quantity: 14,
    category: 'cactus'
  },
  {
    name: 'Spiral Aloe',
    description:
      'This Aloe will take your breath away when you look down on it from above. It s leaves are in spiraling concentric circles that grow larger as they movew out. It makes a hypnotizing center piece to any collection.',
    imageUrl: './plants/spiral.jpg',
    price: 2499,
    quantity: 4,
    category: 'aloe'
  },
  {
    name: 'Black Tree Aeonium',
    description:
      'This tall dark succulent turns almost blanch in full sun. It grows ifferently then most succulents on longer trunk like sections with elaves at the end.',
    imageUrl: './plants/blackTree.jpg',
    price: 1899,
    quantity: 5,
    category: 'succulent'
  },
  {
    name: 'Crested Thimble Cactus',
    description:
      'This cactus is a spreading cactus it grows in small segments that are clustered together. If allowed to spread it will quickly cover and area and become almost like a mat.',
    imageUrl: './plants/crested.jpg',
    price: 1299,
    quantity: 4,
    category: 'cactus'
  },
  {
    name: 'Aloe Vera',
    description:
      'This is That Aloe the one everyone thinks of. It is good on sunburns and cuts. It grows quickly and has bright green leaves and has barbs along the edges.',
    imageUrl: './plants/vera.jpg',
    price: 1299,
    quantity: 7,
    category: 'aloe'
  },
  {
    name: 'Sticks on Fire',
    description:
      'This memeber of the Euphorbia family is very distinctive. It has bright red, pink, orange and yellow stems. It grows tall and thin and is known as a red pencil tree.',
    imageUrl: './plants/redSticks.jpg',
    price: 2599,
    quantity: 4,
    category: 'succulent'
  },
  {
    name: 'Black Beauty',
    description:
      'This succulent has deep dark green leaves which can turn purple in color. The leaves grow at vertical angle and are stiff and bumpy.',
    imageUrl: './plants/beauty.jpg',
    price: 159,
    quantity: 6,
    category: 'aloe'
  },
  {
    name: 'Flowering Stones',
    description:
      'This succulent often gets overlooked for being ugly but they actually come in amny colors and varieties.',
    imageUrl: './plants/lithops.jpg',
    price: 199,
    quantity: 20,
    category: 'succulent'
  },
  {
    name: 'Fan Aloe',
    description:
      'This type of Aloe is known as a tree Aloe. It has a grey trunk with forked branches at the top making the fan like look. As it grows the lower leaves fall of exposing the bark.',
    imageUrl: './plants/fan.jpg',
    price: 1699,
    quantity: 18,
    category: 'aloe'
  },
  {
    name: 'Peruvian Old Lady Cactus',
    description:
      'This columanr cactus grow shorter spines and can grow both small and large in size. Its distintive feature is a wooly fiber that covers the cactus.',
    imageUrl: './plants/peruvian.jpg',
    price: 1099,
    quantity: 6,
    category: 'cactus'
  },
  {
    name: 'Rubble Aloe',
    description:
      'This is known as a spreading Aloe it grows in clusters that spread quickly and can cover large patchs of ground. It has white and yellow teeth, that are harmless, along its edges.',
    imageUrl: './plants/rublle.jpg',
    price: 299,
    quantity: 18,
    category: 'aloe'
  },
  {
    name: 'Misty Lilac',
    description:
      'This member of the Echeveria family its purple grey in color. It grows ina  large rosette with leaves that curl up. If you are lucky it blossoms with a yellow orange blossom.',
    imageUrl: './plants/mistyLilac.jpg',
    price: 1599,
    quantity: 9,
    category: 'succulent'
  },
  {
    name: 'Ariocarpus Iloydii',
    description:
      'This cactus grows ina globular fashion however it looks almost armored with how its sections grow. It is also a blooming flower with bright pink blossoms.',
    imageUrl: './plants/ariolloy.jpg',
    price: 999,
    quantity: 5,
    category: 'cactus'
  },
  {
    name: 'Lace Aloe',
    description:
      'This Aloe is frost hardy making it better for areas that are cooler in temperature. It has sharp pointy leaves thata re wide at the bottom and narrow as they move towards the tip.',
    imageUrl: './plants/lace.jpg',
    price: 1299,
    quantity: 5,
    category: 'aloe'
  },
  {
    name: 'Hobbit Crassula',
    description:
      'This memebr of the Crassula family has bright green tubed leaves with mauve tips. It is sensitive to overwatering so be careful!',
    imageUrl: './plants/hobbit.jpg',
    price: 399,
    quantity: 8,
    category: 'succulent'
  },
  {
    name: 'Medusita',
    description:
      'This cactus gets its name from Medusa. It is reminiscent of her serpent hair with long tendril like growths coming from its main body.',
    imageUrl: './plants/medusita.jpg',
    price: 1299,
    quantity: 6,
    category: 'cactus'
  },
  {
    name: 'Soap Aloe',
    description:
      "The sharp spines on this Aloe are reminiscent of its Cacti bretheren. It's sap can be used for soap but due to this plants slow growing nature we suggest to just let it grow dont harvest its leaves.",
    imageUrl: './plants/soapAloe.jpg',
    price: 12099,
    quantity: 9,
    category: 'aloe'
  },
  {
    name: 'Candelabra',
    description:
      'This succulent is very cactus like however it is not. It has a large trunk and grows crested stems from its thick base giving it an interesting look.',
    imageUrl: './plants/cadelabra.jpg',
    price: 4099,
    quantity: 4,
    category: 'succulent'
  },
  {
    name: 'Cape Aloe',
    description:
      'This Aloe is large and bush like with stunning flowers in its center. It is eyecatcghing centerpiece for any yard.',
    imageUrl: './plants/cape.jpg',
    price: 8099,
    quantity: 9,
    category: 'aloe'
  },
  {
    name: 'Bishop’s Cap',
    description:
      'This cactus is shaped by 5 radiating segments with spines along their edges. It is a flowering cactus with pale yellow flowers.',
    imageUrl: './plants/bishopsCap.jpg',
    price: 1299,
    quantity: 12,
    category: 'cactus'
  },
  {
    name: 'Shafer’s Opuntia',
    description:
      'This cactus grows in a single main column that branches out into may offshoots. It is covered in long spines and can grow very large.',
    imageUrl: './plants/shaferCactus.jpg',
    price: 699,
    quantity: 23,
    category: 'cactus'
  },
  {
    name: 'Ice Plant',
    description:
      'This is a compact fast growing plant, It likes warm environments and does not do well with cold. The leaves stack opposite eachother makign a distinctive pattern.',
    imageUrl: './plants/icePlant.jpg',
    price: 199,
    quantity: 6,
    category: 'succulent'
  },
  {
    name: 'Aylostera Narvaecensis',
    description:
      'This is a smaller globular cactus that grows in bunches. It is covered in fuzzy white spikes and has like pink flowers.',
    imageUrl: './plants/pinkCactus.jpg',
    price: 1299,
    quantity: 14,
    category: 'cactus'
  },
  {
    name: 'Alligator Plant',
    description:
      'This is one of the easiest plants to prpagate known ad the mother of thousands. Its large leaves are covered in baby succulents that grow into new plants.',
    imageUrl: './plants/alligator.jpg',
    price: 2099,
    quantity: 5,
    category: 'succulent'
  },
  {
    name: 'White Stonecrop',
    description:
      'This small ground-cover succulent has oblong lime green leaves. Watch for tiny white flowers in the summer.',
    imageUrl: './plants/stonecrop.jpg',
    price: 899,
    quantity: 8,
    category: 'succulent'
  },
  {
    name: 'Ball Cactus',
    description:
      'This is a globular cactus that grows its spikes along ridges. It has densely packed spikes along its apex that spread as it grows.',
    imageUrl: './plants/ballCactus.jpg',
    price: 999,
    quantity: 12,
    category: 'cactus'
  },
  {
    name: 'Van Balens Aloe',
    description:
      'This Aloe is drastically different then most of its counter parts. It is Made for gthe outdoors and grows bush like in its size it is a stunning piece for a yard in a warm area.',
    imageUrl: './plants/balens.jpg',
    price: 9999,
    quantity: 3,
    category: 'aloe'
  },
  {
    name: 'Topsy Turvy',
    description:
      'This member of the Echeveria family gros in a roseete but the leaves are triangular and thicker then most they grow away from the base and then curl back in. It has grey green color.',
    imageUrl: './plants/topsy.jpg',
    price: 899,
    quantity: 13,
    category: 'succulent'
  },
  {
    name: 'Bird’s Nest',
    description:
      'This cactus grows from main hub withspikey prtotrusions. These protrusions grow spines that interlace that make a cage or nest like effect.',
    imageUrl: './plants/birdNest.jpg',
    price: 599,
    quantity: 13,
    category: 'cactus'
  },
  {
    name: 'Beaver Tail',
    description:
      'This cactus is in the prickly pear family giving it large distinctive paddle shape. It has short spikes and large magenta blossoms.',
    imageUrl: './plants/beaverTail.jpg',
    price: 2099,
    quantity: 13,
    category: 'cactus'
  },
  {
    name: 'Living Rock',
    description:
      'This rosette cactus grows in layered shape and has a rough appearance similair to the rocks it is anutrally found near.',
    imageUrl: './plants/livingRock.jpg',
    price: 1399,
    quantity: 89,
    category: 'cactus'
  },
  {
    name: 'Sahara',
    description:
      'This memeber of the Echeveria family grows in a very large rosette its leaves are thinner then most giving it the look of ornamental cabbage.',
    imageUrl: './plants/sahara.jpg',
    price: 1599,
    quantity: 5,
    category: 'succulent'
  },
  {
    name: 'Brain Cactus',
    description:
      'This cactus is created by intentional damage when it is young that causes it to grow in sinous waves making its distinctive pattern.',
    imageUrl: './plants/brainCactus.jpg',
    price: 1499,
    quantity: 4,
    category: 'cactus'
  },
  {
    name: 'Springtime',
    description:
      'This is a slow growing plant howefver when it gets to tall its weight causes it to fall over. It is beautiful in rock gradens and makes great filler.',
    imageUrl: './plants/crassula.jpg',
    price: 1399,
    quantity: 5,
    category: 'succulent'
  },
  {
    name: 'Short Leaf Aloe',
    description:
      'This Aloe thrives in whar weather, it has green grey leaves tipped wirth vibrant red. The highlight of it however is its bright yellow teeth, this color combination is eye catching.',
    imageUrl: './plants/short.jpg',
    price: 1599,
    quantity: 9,
    category: 'aloe'
  },
  {
    name: 'Brazilian Prickly Pear',
    description:
      'This prickly pear cactus is dantier then most cacti in its family. It has less spikes on its paddles and grows bright red or purplish red fruit.',
    imageUrl: './plants/brazilianCactus.jpg',
    price: 1399,
    quantity: 4,
    category: 'cactus'
  },
  {
    name: 'Ripple Jade',
    description:
      'This memmber of the crassula family has thin wavy leaves. The main color is a brilliant greeen and the edges are a redish brown. It loves full sun.',
    imageUrl: './plants/rippleJade.jpg',
    price: 499,
    quantity: 6,
    category: 'succulent'
  },
  {
    name: 'Button Cactus',
    description:
      'This is a verrrryyy tiny cactus. It grows in small groups or clusters and has a globular appearance and is typically grey in color. It has a rough sandpaper like texture.',
    imageUrl: './plants/buttonCactus.jpg',
    price: 1499,
    quantity: 14,
    category: 'cactus'
  },
  {
    name: 'Black Spined Agave',
    description:
      'This planthas a stunning blue grey color and grows in roseettes. The edge of each leaf have teeth reminiscent of Alow. The teeth tend to be black.',
    imageUrl: './plants/blackSpined.jpg',
    price: 2599,
    quantity: 5,
    category: 'succulent'
  },
  {
    name: 'Snake Aloe',
    description:
      'This Aloe is known for its unique snake plant like shape. It has long leaves that spike upwards with red brown spikes running along its edges.',
    imageUrl: './plants/snake.jpg',
    price: 2499,
    quantity: 8,
    category: 'aloe'
  },
  {
    name: 'Red Aloe',
    description:
      'This Alow thrives in drought. It is an outdoor plant for dry areas were drought is common. This distress is what causes its vibrant red color.',
    imageUrl: './plants/red.jpg',
    price: 4099,
    quantity: 8,
    category: 'aloe'
  },
  {
    name: 'Bunny Cactus',
    description:
      'A plant that grows low to the ground, This cactus does no produce spines instead it produces something known as glochids. It is known for Bunny Ear shaped paddles.',
    imageUrl: './plants/bunnyear.jpg',
    price: 1299,
    quantity: 20,
    category: 'cactus'
  },
  {
    name: 'Salad Bowl',
    description:
      'This is a bright green succulent that grows in large rosettes. The tips of these rosettes turn a blush red if they are hapilly stressed',
    imageUrl: './plants/salad.jpg',
    price: 499,
    quantity: 13,
    category: 'succulent'
  },
  {
    name: 'Sunset Aloe',
    description:
      'Like its name implies this Aloe lives for sun, it only achieves its beautiful sunset colors in bright full sun. In the winter its spikes grow longer and they fade during the warmer months.',
    imageUrl: './plants/sunset.jpg',
    price: 1999,
    quantity: 9,
    category: 'aloe'
  },
  {
    name: 'Malagasy Tree Aloe',
    description:
      'This Aloe is similair to many Aloes but has one drasgtic diffrence its signature Alue rosette is at the end if a large trunk. ',
    imageUrl: './plants/treeAloe.jpg',
    price: 8099,
    quantity: 4,
    category: 'aloe'
  },
  {
    name: 'Strawberry Hedgehog',
    description:
      'This is a columnar cactus covered in pink spikes hence the name Strawberry. It has bright magenta flowers completing its look.',
    imageUrl: './plants/strawberryHedgehog.jpg',
    price: 1599,
    quantity: 14,
    category: 'cactus'
  }
]
const products = Product_build

// ---- seeding Orders----------
let Order_build = []

for (let i = 1; i <= 10; i++) {
  let Order = {
    userId: i,
    status: 'pending',
    total: 50000
  }
  Order_build.push(Order)
}

const orders = Order_build

// ----- seeding Order_Product -------
let Order_Product_build = []

for (let i = 1; i <= 50; i++) {
  let Order_Product = {
    orderId: Math.ceil(Math.random() * 10),
    productId: i,
    quantity: Math.ceil(Math.random() * 5),
    price: 1000
  }
  Order_Product_build.push(Order_Product)
}

const order_products = Order_Product_build

const seed = async () => {
  try {
    await db.sync({force: true})

    // seed your database here!
    await User.bulkCreate(users)
    await Product.bulkCreate(products)
    await Order.bulkCreate(orders)
    await Order_Product.bulkCreate(order_products)
    console.log('Seeding success!')
    db.close()
  } catch (err) {
    console.log(err)
    db.close()
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}

// ---- seeding Orders----------

// let Order_build = []

// for (let i = 0; i <= 110; i++) {
//     let Order = {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
//         email: `${this.firstName}_${this.lastName}@${faker.internet.domainName()}`,
//     }
//     Order_build.push(Order)
// }

// const Order = Order_build
