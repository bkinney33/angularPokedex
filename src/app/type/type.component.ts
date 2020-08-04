import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.sass']
})
export class TypeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: PokeApiService, private router: Router) { }
  Name: string;
  StrongHit: any[];
  WeakHit: any[];
  StrongDef: any[];
  WeakDef: any[];
  NoHit: any[];
  Immune: any[];
  Pokemon: any[];
  typeColor: string;
  moves: any[];

  ngOnInit() {
    this.getTypeDetails(this.route.snapshot.params.type);
  }
 getTypeDetails(typeName) {
   this.api.getType(typeName).subscribe(typeData => {
    this.Name = typeData.name;
    this.StrongHit = typeData.damage_relations.double_damage_to;
    this.WeakDef = typeData.damage_relations.double_damage_from;
    this.StrongDef = typeData.damage_relations.half_damage_from;
    this.WeakHit = typeData.damage_relations.half_damage_to;
    this.NoHit = typeData.damage_relations.no_damage_to;
    this.Immune = typeData.damage_relations.no_damage_from;
    this.Pokemon = typeData.pokemon;
    this.typeColor = this.setTypeColor(typeData.name);
    this.moves = typeData.moves;
   });
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
