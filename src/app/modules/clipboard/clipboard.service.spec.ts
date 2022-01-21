import { TestBed } from '@angular/core/testing';

import { ClipboardService } from './clipboard.service';
import { ClipboardModule } from './clipboard.module';

describe('ClipboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ClipboardModule
    ]
  }));

  it('should be created', () => {
    const service: ClipboardService = TestBed.get(ClipboardService);
    expect(service).toBeTruthy();
  });
});
