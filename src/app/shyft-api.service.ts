import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _header = { 'x-api-key': environment.shyftApiKey };
  // private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // solana
  private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs'; // silly dragon


  getEndpoint() {
    const url = new URL(environment.shyftRpcUrl);

    url.searchParams.set('api_key', environment.shyftApiKey);

    return url.toString();
  }

  getAccount(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL(`${environment.shyftApiUrl}/sol/v1/wallet/token_balance`);
    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);
    url.searchParams.set('token', this._mint);

    return this._httpClient.get<{ result: { balance: number, info: { image: string } } }>(url.toString(), { headers: this._header })
      .pipe(map(response => response.result));
  }

  getTransactions(publicKey: string | undefined | null) {
    if (!publicKey) {
      return null;
    }

    const url = new URL(`${environment.shyftApiUrl}/sol/v1/transaction/history`);
    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('account', publicKey);
    url.searchParams.set('tx_num', '3');

    return this._httpClient.get<{ message: string, result: [], success: boolean }>(url.toString(), { headers: this._header })
      .pipe(map(response => response.result))
  }

  getAllTokens(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }

    const url = new URL(`${environment.shyftApiUrl}/sol/v1/wallet/all_tokens`);
    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient
      .get<{
        result: {
          address: string;
          balance: number;
          info: { name: string; symbol: string; image: string };
        }[]
      }>(url.toString(), { headers: this._header })
      .pipe(map(response => response.result))
  }
}