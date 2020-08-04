import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonComponent} from './pokemon/pokemon.component';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {AbilitiesComponent} from './abilities/abilities.component';
import {MoveComponent} from './move/move.component';
import {TypeComponent} from './type/type.component';

const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonComponent,
    data: { title: 'List of Pokemon' }
  },
  {
    path: 'pokemon-details/:id',
    component: PokemonDetailComponent,
    data: { title: 'Details of a Pokemon' }
  },
  {
    path: 'ability/:id',
    component: AbilitiesComponent,
    data: { title: 'Details of a Ability' }
  },
  {
    path: 'move/:id',
    component: MoveComponent,
    data: { title: 'Details of a Move' }
  },
  {
    path: 'type/:type',
    component: TypeComponent,
    data: { title: 'Details of a Type' }
  },
  {
    path: '',
    redirectTo: '/pokemon',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
