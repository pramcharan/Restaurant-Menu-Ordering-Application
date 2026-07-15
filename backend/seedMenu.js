import dotenv from "dotenv";
import connectDB from "./config/db.js";
import MenuItem from "./models/MenuItem.js";

dotenv.config();
const menuItems = [
  {
    name: "Veg Spring Rolls",
    description: "Crispy vegetable spring rolls.",
    price: 180,
    category: "Food",
    imageUrl: "/uploads/springroll.jpg",
    available: true,
  },
  {
    name: "Paneer Tikka",
    description: "Grilled paneer cubes with spices.",
    price: 250,
    category: "Food",
    imageUrl: "/uploads/paneer-tikka.jpg",
    available: true,
  },
  {
    name: "Veg Biryani",
    description: "Aromatic basmati rice with vegetables.",
    price: 280,
    category: "Food",
    imageUrl: "/uploads/biryani.jpg",
    available: true,
  },
  {
    name: "Paneer Butter Masala",
    description: "Paneer cooked in creamy tomato gravy.",
    price: 320,
    category: "Food",
    imageUrl: "/uploads/paneer-butter-masala.jpg",
    available: true,
  },
  {
    name: "Butter Naan",
    description: "Soft butter naan.",
    price: 50,
    category: "Food",
    imageUrl: "/uploads/butter-naan.jpg",
    available: true,
  },
  {
    name: "Fried Rice",
    description: "Vegetable fried rice.",
    price: 240,
    category: "Food",
    imageUrl: "/uploads/fried-rice.jpg",
    available: true,
  },
  {
    name: "Cold Coffee",
    description: "Refreshing cold coffee.",
    price: 150,
    category: "Drink",
    imageUrl: "/uploads/cold-coffee.jpg",
    available: true,
  },
  {
    name: "Fresh Lime Soda",
    description: "Fresh lime soda.",
    price: 80,
    category: "Drink",
    imageUrl: "/uploads/fresh-lime-soda.jpg",
    available: true,
  },
  {
    name: "Mango Shake",
    description: "Fresh mango milkshake.",
    price: 170,
    category: "Drink",
    imageUrl: "/uploads/mango-shake.jpg",
    available: true,
  },
  {
    name: "Hot Cappuccino",
    description: "Fresh hot cappuccino.",
    price: 140,
    category: "Drink",
    imageUrl: "/uploads/hot-cappuccino.jpg",
    available: true,
  },
  {
    name: "Chocolate Cake",
    description: "Soft chocolate cake.",
    price: 160,
    category: "Dessert",
    imageUrl: "/uploads/chocolate-cake.jpg",
    available: true,
  },
  {
    name: "Brownie with Ice Cream",
    description: "Chocolate brownie served with vanilla ice cream.",
    price: 180,
    category: "Dessert",
    imageUrl: "/uploads/brownie-icecream.jpg",
    available: true,
  },
  {
    name: "Gulab Jamun",
    description: "Traditional Indian sweet.",
    price: 90,
    category: "Dessert",
    imageUrl: "/uploads/gulab-jamun.jpg",
    available: true,
  },
  {
    name: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream.",
    price: 120,
    category: "Dessert",
    imageUrl: "/uploads/vanilla-icecream.jpg",
    available: true,
  },
];
const seedMenu = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();

    await MenuItem.insertMany(menuItems);

    console.log("Menu seeded successfully");

    process.exit();

  } catch (error) {
    console.log("Seed error:", error);
    process.exit(1);
  }
};

seedMenu();