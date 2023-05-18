import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'rides',
    loadComponent: () => import('./rides/rides.page').then(m => m.RidesPage)
  },
  {
    path: 'ride-form/:id',
    loadComponent: () => import('./ride-form/ride-form.page').then(m => m.RideFormPage)
  },
];
