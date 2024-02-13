import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor],
  selector: 'nx-heavyduty1-root',
  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Wallet Operations</h1>
      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <section class="mb-8 mt-8">
        @if (account()) {
          <div class="top-4 left-4 flex justify-center items-center gap-2 mb-4">
            <img [src]="account()?.info?.image" class="w-8 h-8">
            <p class="text-xl">{{ account()?.balance }}</p>
          </div>
        }

        @if (accountTransactionHistory()) {
          <div class="top-4 left-4 flex justify-center items-center gap-2">
            <p class="text-lg">{{ accountTransactionHistory()?.message }} | </p>
            <p class="text-lg">{{ accountTransactionHistory()?.result }} | </p>
            <p class="text-lg">{{ accountTransactionHistory()?.success }}</p>
          </div>
        }
      </section>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true }
  );

  readonly accountTransactionHistory = computedAsync(
    () => this._shyftApiService.getAccountTransactionHistory(this._publicKey()?.toBase58()),
    { requireSync: true }
  );
}
