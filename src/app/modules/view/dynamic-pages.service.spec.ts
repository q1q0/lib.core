import { TestBed } from '@angular/core/testing';

import { DynamicPagesService } from './dynamic-pages.service';
import { SessionModule } from '../session/session.module';
import { McoContainerModule } from '../mco-container/mco-container.module';

describe('DynamicPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SessionModule,
      McoContainerModule
    ]
  }));

  it('should be created', () => {
    const service: DynamicPagesService = TestBed.get(DynamicPagesService);
    expect(service).toBeTruthy();
  });
});
