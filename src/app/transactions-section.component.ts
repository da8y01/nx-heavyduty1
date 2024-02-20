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

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef> Tipo </th>
          <td mat-cell *matCellDef="let element"> {{element.type}} </td>
        </ng-container>

        <!-- Timestamp Column -->
        <ng-container matColumnDef="timestamp">
          <th mat-header-cell *matHeaderCellDef> Fecha-Hora </th>
          <td mat-cell *matCellDef="let element"> {{element.timestamp}} </td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Estado </th>
          <td mat-cell *matCellDef="let element"> {{element.status}} </td>
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
  displayedColumns: string[] = ['type', 'timestamp', 'status'];

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transactions = computedAsync(
    () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
    { requireSync: true }
  );
}
