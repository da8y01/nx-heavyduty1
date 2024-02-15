import {CommonModule} from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { MatTableModule } from '@angular/material/table';
import { Observable, ReplaySubject, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

export interface TransactionElement {
  date: Date;
  amount: number;
  destination: string;
  source: string;
}

const ELEMENT_DATA: TransactionElement[] = [
  {date: new Date, amount: 1, destination: 'abcd0123', source: 'abcd0123'},
  {date: new Date, amount: 2, destination: 'abcd0123', source: 'abcd0123'},
];

@Component({
  selector: 'nx-heavyduty1-transactions-section',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  template: `
    <section class="mt-4">
      <h2 class="flex justify-center text-lg">Historial</h2>

      @if (transactions()) {
        <table mat-table [dataSource]="dataSource">

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
      }

      @if (transactions()) {
        <div class="text-lg">Data:</div>
        <div>{{ dataResult | json }}</div>
      }
    </section>
  `
})

export class TransactionsSectionComponent {
  displayedColumns: string[] = ['date', 'amount', 'destination', 'source'];
  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new HistoryDataSource(this.dataToDisplay);

  dataResult: TransactionElement[] = ELEMENT_DATA;

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transactions = computedAsync(
    () => {
      return this._shyftApiService.getTransactions(this._publicKey()?.toBase58())?.subscribe(result => {
        this.dataSource.setData(result)
        this.dataResult = result
        // this.dataSource.setData(ELEMENT_DATA)
        // this.dataResult = ELEMENT_DATA
        return result
      })
    },
    { requireSync: true }
  );
}

class HistoryDataSource extends DataSource<TransactionElement> {
  private _dataStream = new ReplaySubject<TransactionElement[]>();

  constructor(initialData: TransactionElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<TransactionElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: TransactionElement[]) {
    this._dataStream.next(data);
  }
}