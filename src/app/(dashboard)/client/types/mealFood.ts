// export type MealFood = {
//   id: number;
//   amount: number;
//   food: {
//     id: number;
//     name: string;
//     calories: number;
//     protein: number | null;
//     carbohydrates: number | null;
//     fat: number | null;
//     sugar: number | null;
//     fiber: number | null;
//   };
//   servingUnit?: {
//     id: number;
//     name: string;
//   } | null;
// };

export type Food = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  sugar: number;
  fiber: number;
};

export type MealFood = {
  amount: number;
  food: Food;
};

export type Meal = {
  mealFoods: MealFood[];
};

export type NutritionTotals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
};
