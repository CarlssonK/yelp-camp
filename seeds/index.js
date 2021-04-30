const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


const sample = (array) => (
  array[Math.floor(Math.random() * array.length)]
)



const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 250; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "607ee52b30890807ac35ba80",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque velit tenetur asperiores ipsa, nostrum excepturi dolore distinctio deleniti nam mollitia?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
          filename: 'YelpCamp/o49lmco1wdzcusmge7rn'
        },
        {
          url: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          filename: 'YelpCamp/wahxqt5cte2ujonafl3g'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})