import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// import image
import Samosa from "../../assets/samosa.jpg";
import ChholeBhature from "../../assets/ChholeBhature.jpg";
import BarbecueBurger from "../../assets/BarbecueBurger.jpg";
import MasalaChai from "../../assets/MasalaChai.jpg";
import Jalebi from "../../assets/Jalebi.jpg";
import Momo from "../../assets/Momo.jpg";
import ChickenTikka from "../../assets/ChickenTikka.jpg";
import PavBhaji from "../../assets/PavBhaji.jpg";
import Rosogolla from "../../assets/Rosogolla.jpg";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Samosa",
    description: "The king of all street foods in India ",
    price: 3.99,
    img: Samosa,
  },
  {
    id: "m2",
    name: "Chhole Bhature",
    description: "A Indian specialty!",
    price: 16.5,
    img: ChholeBhature,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
    img: BarbecueBurger,
  },
  {
    id: "m4",
    name: "Masala Chai",
    description: "Healthy...and enjoy...",
    price: 7.99,
    img: MasalaChai,
  },
  {
    id: "m5",
    name: "Jalebi",
    description: "so delicious that one can easily imagine",
    price: 12.99,
    img: Jalebi,
  },
  {
    id: "m6",
    name: "Momo",
    description: "little parcels of joy ",
    price: 42.5,
    img: Momo,
  },
  {
    id: "m7",
    name: "Chicken Tikka",
    description: "reliable source of joy",
    price: 112.99,
    img: ChickenTikka,
  },
  {
    id: "m8",
    name: "Pav Bhaji",
    description: "not one state, but all indias lover",
    price: 26.99,
    img: PavBhaji,
  },
  {
    id: "m9",
    name: "Rosogolla",
    description: "Bengalis and rosogollas were synonymous.",
    price: 15.99,
    img: Rosogolla,
  },
];

const AvailableMeals = () => {
  // converting the meals array into jsx
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      img={meal.img}
    />
  ));

  return (
    <section className={classes.meals}>
      {/* <section> */}
      {/* <Card> */}

      {/* <ul>{mealsList}</ul> */}
      {/* {mealsList} */}
      {/* {mlist} */}
      <div className={classes["grid-container"]}>{mealsList}</div>
      {/* </Card> */}
    </section>
  );
};

export default AvailableMeals;
