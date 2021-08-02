import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipes.service";
import { PlaceholderDirective } from "./shared/placeholder.directive";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
  providers: [
    RecipeService, 
    ShoppingListService,
    PlaceholderDirective,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}