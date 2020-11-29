import { Test, TestingModule } from '@nestjs/testing';
import { SiteCheckerController } from './site-checker.controller';

describe('SiteCheckerController', () => {
  let controller: SiteCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteCheckerController],
    }).compile();

    controller = module.get<SiteCheckerController>(SiteCheckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
