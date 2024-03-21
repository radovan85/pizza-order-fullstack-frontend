import { Routes } from '@angular/router';
import { CartItemFormComponent } from './components/cart/cart-item-form/cart-item-form.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { InvalidCartComponent } from './components/cart/invalid-cart/invalid-cart.component';
import { ItemAddedComponent } from './components/cart/item-added/item-added.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { RegistrationFailedComponent } from './components/customers/registration-failed/registration-failed.component';
import { RegistrationPassedComponent } from './components/customers/registration-passed/registration-passed.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddressConfirmationComponent } from './components/order/address-confirmation/address-confirmation.component';
import { OrderCanceledComponent } from './components/order/order-canceled/order-canceled.component';
import { OrderCompletedComponent } from './components/order/order-completed/order-completed.component';
import { OrderConfirmationComponent } from './components/order/order-confirmation/order-confirmation.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { PhoneConfirmationComponent } from './components/order/phone-confirmation/phone-confirmation.component';
import { PizzaDetailsComponent } from './components/pizzas/pizza-details/pizza-details.component';
import { PizzaFormComponent } from './components/pizzas/pizza-form/pizza-form.component';
import { PizzaListComponent } from './components/pizzas/pizza-list/pizza-list.component';
import { PizzaUpdateFormComponent } from './components/pizzas/pizza-update-form/pizza-update-form.component';
import { PizzaSizeDetailsComponent } from './components/pizzaSizes/pizza-size-details/pizza-size-details.component';
import { PizzaSizeErrorComponent } from './components/pizzaSizes/pizza-size-error/pizza-size-error.component';
import { PizzaSizeFormComponent } from './components/pizzaSizes/pizza-size-form/pizza-size-form.component';
import { PizzaSizeListByPizzaComponent } from './components/pizzaSizes/pizza-size-list-by-pizza/pizza-size-list-by-pizza.component';
import { PizzaSizeListComponent } from './components/pizzaSizes/pizza-size-list/pizza-size-list.component';
import { PizzaSizeUpdateFormComponent } from './components/pizzaSizes/pizza-size-update-form/pizza-size-update-form.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { unidentifiedGuard } from './guards/unidentified.guard';
import { userGuard } from './guards/user.guard';


export const routes: Routes = [

    {
        path: `home`,
        component: HomeComponent,
        canActivate: [authGuard]
    },

    {
        path: `login`,
        component: LoginComponent,
        canActivate: [unidentifiedGuard]
    },

    {
        path: `pizzas`,
        component: PizzaListComponent,
        canActivate: [authGuard]
    },

    {
        path: `pizzaSizes`,
        component: PizzaSizeListComponent,
        canActivate: [authGuard]
    },

    {
        path: `customers`,
        component: CustomerListComponent,
        canActivate: [adminGuard]
    },

    {
        path: `registration`,
        component: CustomerFormComponent,
        canActivate: [unidentifiedGuard]
    },

    {
        path: `registration/Passed`,
        component: RegistrationPassedComponent,
        canActivate: [unidentifiedGuard]
    },

    {
        path: `registration/Failed`,
        component: RegistrationFailedComponent,
        canActivate: [unidentifiedGuard]
    },

    {
        path: `pizzas/addPizza`,
        component: PizzaFormComponent,
        canActivate: [adminGuard]
    },

    {
        path: `pizzas/pizzaDetails/:pizzaId`,
        component: PizzaDetailsComponent,
        canActivate: [authGuard]
    },

    {
        path: `pizzas/updatePizza/:pizzaId`,
        component: PizzaUpdateFormComponent,
        canActivate: [adminGuard]
    },

    {
        path: `pizzaSizes/pizzaSizeDetails/:pizzaSizeId`,
        component: PizzaSizeDetailsComponent,
        canActivate: [authGuard]
    },

    {
        path: `pizzaSizes/addPizzaSize`,
        component: PizzaSizeFormComponent,
        canActivate: [adminGuard]
    },

    {
        path: `pizzaSizes/updatePizzaSize/:pizzaSizeId`,
        component: PizzaSizeUpdateFormComponent,
        canActivate: [adminGuard]
    },

    {
        path: `pizzaSizes/error`,
        component: PizzaSizeErrorComponent,
        canActivate: [adminGuard]
    },

    {
        path: `pizzaSizes/:pizzaId`,
        component: PizzaSizeListByPizzaComponent,
        canActivate: [authGuard]
    },

    {
        path: `cart/addPizza/:pizzaId`,
        component: CartItemFormComponent,
        canActivate: [userGuard]
    },

    {
        path: `cart/itemAdded`,
        component: ItemAddedComponent,
        canActivate: [userGuard]
    },

    {
        path: `cart`,
        component: CartComponent,
        canActivate: [userGuard]
    },

    {
        path: `order/addressConfirmation`,
        component: AddressConfirmationComponent,
        canActivate: [userGuard]
    },

    {
        path: `order/phoneConfirmation`,
        component: PhoneConfirmationComponent,
        canActivate: [userGuard]
    },

    {
        path: `order/orderConfirmation`,
        component: OrderConfirmationComponent,
        canActivate: [userGuard]
    },

    {
        path: `order/canceled`,
        component: OrderCanceledComponent,
        canActivate: [userGuard]
    },

    {
        path: `cart/invalidCart`,
        component: InvalidCartComponent,
        canActivate: [userGuard]
    },

    {
        path: `order/orderCompleted`,
        component: OrderCompletedComponent,
        canActivate: [userGuard]
    },

    {
        path: `order/allOrders`,
        component: OrderListComponent,
        canActivate: [adminGuard]
    },

    {
        path: `order/orderDetails/:orderId`,
        component: OrderDetailsComponent,
        canActivate: [adminGuard]
    },

    {
        path: `customers/customerDetails/:customerId`,
        component: CustomerDetailsComponent,
        canActivate: [adminGuard]
    },

    {
        path: `**`,
        redirectTo: `home`,
        pathMatch: `full`
    }
];
