import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Strogonoff',
  //     'This is a wonderful food!',
  //     'https://espetinhodesucesso.com.br/wp-content/uploads/2018/08/qual-a-melhor-carne-para-strogonoff-1200x675.jpg',
  //     [
  //       new Ingredient('Meat', 1),        
  //       new Ingredient('Milk Cream', 2)        
  //     ]
  //   ),
  //   new Recipe(
  //     'Hamburger',
  //     'This is a wonderful food too!',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg',
  //     [
  //       new Ingredient('Meat', 1),        
  //       new Ingredient('Bread', 2) 
  //     ]
  //   )
  // ];
  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}