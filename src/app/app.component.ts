import { Component, OnInit, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor, MatTableModule],
  selector: 'nx-heavyduty1-root',
  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Wallet Operations</h1>
      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
          <li>
            <a [routerLink]="['saldo']" mat-raised-button>Saldo</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent implements OnInit {
  private readonly _shyftApiService = inject(ShyftApiService)
  private readonly _connectionStore = inject(ConnectionStore)

  ngOnInit(): void {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint())
  }
}
