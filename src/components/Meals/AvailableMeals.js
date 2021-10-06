import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  // to save in state of meals we got from firebase
  const [ourMeals, setOurMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  // for error handling
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const myrespones = await fetch(
        "https://onemorefoodweb-default-rtdb.firebaseio.com/meals.json"
      );

      if (!myrespones.ok) {
        // throw an error
        throw new Error("Sorry ! Something went wrong ");
      }
      const responseData = await myrespones.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          img: responseData[key].img,
        });
      }

      setOurMeals(loadedMeals);
      setIsLoading(false);
    };

    // run the function which is declared in above
    fetchMeals().catch((error) => {
      // catch any error occured in the ferchmeals function
      // stop showing loading and show the error
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading..</section>;
  }

  // check is there any error, if so then return this error
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // converting the meals array into jsx
  const mealsList = ourMeals.map((meal) => (
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
      <div className={classes["grid-container"]}>{mealsList}</div>
    </section>
  );
};

export default AvailableMeals;
