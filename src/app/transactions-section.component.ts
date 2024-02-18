import {CommonModule} from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'nx-heavyduty1-transactions-section',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  template: `
    <section class="mt-4">
      <h2 class="flex justify-center text-lg">Historial</h2>

      <table mat-table [dataSource]="transactions() ?? []">

        <!--- Note that these columns can be defined in any order.
              The actual rendered columns are set as a property on the row definition" -->

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Fecha </th>
          <td mat-cell *matCellDef="let element"> {{element.date}} </td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef> Monto </th>
          <td mat-cell *matCellDef="let element"> {{element.amount}} </td>
        </ng-container>

        <!-- Destination Column -->
        <ng-container matColumnDef="destination">
          <th mat-header-cell *matHeaderCellDef> Destinatario </th>
          <td mat-cell *matCellDef="let element"> {{element.destination}} </td>
        </ng-container>

        <!-- Source Column -->
        <ng-container matColumnDef="source">
          <th mat-header-cell *matHeaderCellDef> Emisor </th>
          <td mat-cell *matCellDef="let element"> {{element.source}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <div class="text-lg">Data:
        <p>{{ transactions() | json }}</p>
      </div>
    </section>
  `
})

export class TransactionsSectionComponent {
  displayedColumns: string[] = ['date', 'amount', 'destination', 'source'];

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transactions = computedAsync(
    () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
    { requireSync: true }
  );
}
