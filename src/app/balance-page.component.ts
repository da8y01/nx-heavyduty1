import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'nx-heavyduty1-balance-page',
  standalone: true,
  imports: [BalanceSectionComponent, TransactionsSectionComponent],
  template: `
    <nx-heavyduty1-balance-section class="flex justify-center"></nx-heavyduty1-balance-section>
    <nx-heavyduty1-transactions-section></nx-heavyduty1-transactions-section>
  `
})

export class BalancePageComponent {}