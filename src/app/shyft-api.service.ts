import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { 'x-api-key': '0123abcd' };
    // private readonly _mint = 'sillydragon'; // silly dragon
    private readonly _mint = 'solana'; // solana

  getAccount(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('http://localhost:3000/shyft1');
    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    url.searchParams.set('token', this._mint);

    return this._httpClient.get<{ result: { balance: number, info: { image: string } } }>(url.toString(), { headers: this._header })
      .pipe(map(response => response.result));
  }

  getAccountTransactionHistory(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL('http://localhost:3000/shyft1history');
    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient.get<{ message: string, result: [], success: boolean }>(url.toString(), { headers: this._header })
      .pipe(map(response => response));
  }
}