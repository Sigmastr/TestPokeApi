import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TestPokeApi';
  pokemonList: any[] = [];
  selectedPokemonDetails: any = {};
  ordenarCampo: string = 'name';
  orden: number = 1;
  visible: boolean = false;
  selectedPokemonImages: any = [];
  inicio: number = 0;
  selectedPokemonTypes: string='';
  selectedPokemonAbilities: string='';
  constructor(private pokemonService: PokemonService) {
  }
  @ViewChild('dataTable', { static: false }) dt2: Table | undefined;
  // Defino las columnas dinámicas
  cols: any[] = [
    { field: 'name', header: 'Nombre' },
  ];
  @ViewChild('carousel') carousel: any;
  busquedaGlobal(event: any) {
    if (this.dt2) {
      this.dt2.filterGlobal(event.target.value, 'contains');
    }
  }

  ngOnInit(): void {
    this.getPokemonList();
  }
  //acá obtengo a lista de pokemones
  getPokemonList() {
    this.pokemonService.getPokemonList(151, 0).subscribe((data: any) => {
      this.pokemonList = data.results;
    });
  }

  ordenarTabla(field: string) {
    if (field === this.ordenarCampo) {
      this.orden *= -1;
    } else {
      this.orden = 1;
    }
    this.ordenarCampo = field;
    this.pokemonList.sort((a, b) => {
      const valueA = a[this.ordenarCampo].toLowerCase();
      const valueB = b[this.ordenarCampo].toLowerCase();
      return this.orden * valueA.localeCompare(valueB);
    });
  }



  getPokemonDetails(url: string) {
    const id = url.split('/').filter(segment => !!segment).pop();

    const pokemonId = Number(id);
    this.pokemonService.getPokemonDetails(pokemonId).subscribe((data: any) => {
      this.selectedPokemonDetails = data;
      this.showDialog();
      this.visible = true;
      this.getPokemonTypes();
      this.getPokemonAbilities();
    });
    
  }

  getPokemonTypes() {
    if (this.selectedPokemonDetails && this.selectedPokemonDetails.types) {
      const types = this.selectedPokemonDetails.types;
  
      if (Array.isArray(types) && types.length > 0) {
        try {
          const typeNames = types.map((type: any) => type.type.name);
          this.selectedPokemonTypes = typeNames.join(', ');
  
        } catch (error) {
          console.error('Error al analizar la cadena JSON:', error);
        }
      } else {
        console.error('No se encontraron tipos válidos en los detalles del Pokémon.');
      }
    } else {
      this.selectedPokemonTypes = 'No hay registros';
    }
  }
  

  getPokemonAbilities()
  {
    if (this.selectedPokemonDetails.abilities) {
      this.selectedPokemonAbilities = this.selectedPokemonDetails.abilities
        .map((abilityObj: any) => abilityObj.ability.name)
        .join(', ');
    }
  }
  


  showDialog() {
  this.visible = true;

    const sprites = this.selectedPokemonDetails.sprites;
    this.selectedPokemonImages = [];
   if (sprites.front_default) {
    this.selectedPokemonImages.push(sprites.front_default);
  }
  if (sprites.front_female) {
    this.selectedPokemonImages.push(sprites.front_female);
  }
  if (sprites.front_shiny) {
    this.selectedPokemonImages.push(sprites.front_shiny);
  }
  if (sprites.front_shiny_female) {
    this.selectedPokemonImages.push(sprites.front_shiny_female);
  }
  if (sprites.back_default) {
    this.selectedPokemonImages.push(sprites.back_default);
  }
  if (sprites.back_female) {
    this.selectedPokemonImages.push(sprites.back_female);
  }
  if (sprites.back_shiny) {
    this.selectedPokemonImages.push(sprites.back_shiny);
  }
  if (sprites.back_shiny_female) {
    this.selectedPokemonImages.push(sprites.back_shiny_female);
  }
   console.log(this.selectedPokemonImages)
  }
 
  onDialogHide()
  {
    if(this.carousel)
    {
      this.carousel.page = 0;
    }
  }

}
