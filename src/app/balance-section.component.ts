import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
  selector: 'nx-heavyduty1-balance-section',
  template: `
    <section>
      <h2 class="text-lg">Balance</h2>
      @if (account()) {
        <div class="flex gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }}</p>
        </div>
      }
    </section>
  `,
  standalone: true
})

export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true }
  );
}