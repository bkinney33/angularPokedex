import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Ability} from '../ability';
import { PokeApiService } from '../poke-api.service';


@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.sass']
})
export class AbilitiesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: PokeApiService, private router: Router) { }
  ability: Ability = { id: null, name: '', effect: ''};
  isLoadingResults = true;

  ngOnInit() {
    this.getAbilityDetails(this.route.snapshot.params.id);
  }
  getAbilityDetails(id) {
    this.api.getAbility(id).subscribe(data => {
      this.ability = data;
      this.isLoadingResults = false;
      console.log(this.ability);
      });

  }
}
