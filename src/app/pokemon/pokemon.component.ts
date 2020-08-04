import { Component, OnInit, ViewChild } from '@angular/core';
import {PokeApiService} from '../poke-api.service';
import {Pokemon} from '../pokemon';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.sass']
})
export class PokemonComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  pokemonResults:Pokemon[] = [];
  isLoadingResults = true;
  datasource: MatTableDataSource<Pokemon>;
  constructor(private api: PokeApiService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.api.getMultiplePokemon()
      .subscribe(res => {
        this.isLoadingResults = false;
        for(const results of res.results){

            if(results.name.search("-f$|-female|-male|-totem")===-1){
             this.pokemonResults.push(results);
            }
        }

        this.datasource =  new MatTableDataSource<Pokemon>(this.pokemonResults);
        this.datasource.paginator = this.paginator;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
