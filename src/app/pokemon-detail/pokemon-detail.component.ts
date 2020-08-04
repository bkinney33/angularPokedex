import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from '../poke-api.service';
import { Pokemon } from '../pokemon';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.sass']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: PokeApiService, private router: Router) { }

  pokemon: Pokemon = { id: null, name: '', types:[], typeOne: '', typeTwo: '', abilities: [],
     feet: null, inches: null, pounds: null, height: null, weight: null, stats: [], moves: [], results: [], count: null,sprites:[],
     back_default:"",
     back_female:"",
     front_female:"",
     front_default:"",
     back_shiny: "",
     back_shiny_female:"",
     front_shiny: "",
     front_shiny_female: ""
   };
  isLoadingResults = true;
  hideStats = false;
  hideMoves = true;
  typeColorOne: string;
  typeColorTwo: string;
  display: string;
  dexEntries: any[];
  dexEntry: string;

  temp;
  types :any[]= new Array();
  ngOnInit() {
    this.getPokemonDetails(this.route.snapshot.params.id);
  }
  getPokemonDetails(id) {
    this.api.getPokemon(id)
      .subscribe(data => {
        this.pokemon = data;
        if(this.pokemon.name.search("-male")>-1){
           this.pokemon.name= this.pokemon.name.split("-")[0]


        }
        this.pokemon.feet = Math.floor(((this.pokemon.height * 3.937) / 12));
        this.pokemon.inches = Math.floor(((this.pokemon.height * 3.937) % 12));
        this.pokemon.pounds = Math.floor(this.pokemon.weight / 4.536);
        this.typeColorOne = this.setTypeColor(this.pokemon.types[0].type.name);
        this.types.push(this.pokemon.types[0].type.name)


        if (data.types[1] === undefined) {
          this.display = 'none';
          this.typeColorTwo = this.setTypeColor(this.pokemon.types[0].type.name);
          this.types[1] = this.pokemon.types[0].type.name;
        } else {
          this.display = 'block';
          this.typeColorTwo = this.setTypeColor(this.pokemon.types[1].type.name);
          this.types.push(this.pokemon.types[1].type.name)
        }

        this.pokemon.front_default = this.temp.front_default
        if(  this.temp.back_default !== null){
            this.pokemon.back_default =   this.temp.back_default
        }

        if(  this.temp.front_female !== null){
            this.pokemon.front_female =   this.temp.front_female
        }

        if(  this.temp.back_female !== null){
            this.pokemon.back_female=  this.temp.back_female
        }


        this.isLoadingResults = false;
      });
      console.log(id);

      if(parseInt(id) >=10130 && parseInt(id)<=10142){
        id= "minior";
      }
      if(parseInt(id)===10126){
        id="lycanroc"
      }
    this.api.getSpecies(id).subscribe(data => {
      console.log(data);

      if(data.flavor_text_entries !== undefined){
      this.dexEntries = data.flavor_text_entries;
      }
      this.api.getEvoChain(data.evolution_chain.url).subscribe(evoData => {
        console.log(evoData);
      });
      this.setdexEntries(this.dexEntries);
    });

  }
  setdexEntries(dexEntries) {
    for (const entry of dexEntries) {
      if (entry.language.name === 'en') {
        this.dexEntry = entry.flavor_text;
        break;
      }
    }
  }
  setInfoBox(navItem) {
    switch (navItem.target.innerText) {
      case 'Moves': {
        this.hideStats = true;
        this.hideMoves = false;
        break;
      }
      case 'Stats': {
        this.hideStats = false;
        this.hideMoves = true;
        break;
      }
    }
  }
  setTypeColor(type) {
    let typeColor;
    switch (type) {
      case 'fire': {
        typeColor = '#E42A01';
        break;
      }
      case 'water': {
        typeColor = 'blue';
        break;
      }
      case 'grass': {
        typeColor = 'green';
        break;
      }
      case 'electric': {
        typeColor = 'yellow';
        break;
      }
      case 'poison': {
        typeColor = 'purple';
        break;
      }
      case 'ground': {
        typeColor = '#B46F48';
        break;
      }
      case 'rock': {
        typeColor = 'brown';
        break;
      }
      case 'flying': {
        typeColor = 'skyblue';
        break;
      }
      case 'steel': {
        typeColor = 'grey';
        break;
      }
      case 'bug': {
        typeColor = 'yellowgreen';
        break;
      }
      case 'ice': {
        typeColor = 'lightblue';
        break;
      }
      case 'psychic': {
        typeColor = '#FC95D3';
        break;
      }
      case 'ghost': {
        typeColor = '#290D6D';
        break;
      }
      case 'fighting': {
        typeColor = '#BB5200';
        break;
      }
      case 'dark': {
        typeColor = '#353535';
        break;
      }
      case 'fairy': {
        typeColor = 'hotpink';
        break;
      }
      case 'normal': {
        typeColor = '#BDBA9D';
        break;
      }
      case 'dragon': {
        typeColor = '#0086CD';
        break;
      }
    }
    return typeColor;
  }
}
