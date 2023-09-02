import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}
  //hacer el limit dinámico, el offset sera ese limite x la cantidad de pagina *  
  getPokemonList(limit: number, offset:number) {
    return this.http.get(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(id: number) {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }
}
