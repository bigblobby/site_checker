import { Test, TestingModule } from '@nestjs/testing';
import { SiteCheckerService } from './site-checker.service';

describe('SiteCheckerService', () => {
  let service: SiteCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteCheckerService],
    }).compile();

    service = module.get<SiteCheckerService>(SiteCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
