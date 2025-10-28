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
}];
