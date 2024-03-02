import { Component, inject } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { MatDialog } from '@angular/material/dialog';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'nx-heavyduty1-balance-section',
  standalone: true,
  imports: [MatAnchor],
  template: `
    <section>
      <h2 class="flex justify-center text-lg">Saldo</h2>
      @if (account()) {
        <div class="flex gap-2 justify-center">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }}</p>
        </div>
        <div class="flex justify-center">
          <a (click)="openDialog()" mat-raised-button>Transferir</a>
        </div>
      }
    </section>
  `
})

export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();
  private readonly _matDialog = inject(MatDialog);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true }
  );

  openDialog() {
    this._matDialog.open(TransferModalComponent);
  }
}