import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () => import('./components/home_page/conector').then(c => c.HomePage)
},
{
    path: 'contact',
    loadComponent: () => import('./components/contacts-page/connector').then(c => c.ContactPage)
},
{
    path: 'catalog',
    loadComponent: () => import('./components/catalog-page/connector').then(c => c.CatalogPage)
},
{
    path: 'product/:id',
    loadComponent: () => import('./components/product-page/connector').then(c => c.ProductPage)
},
{
    path: 'test',
    loadComponent: () => import('./components/test/test').then(c => c.Test)
}];
