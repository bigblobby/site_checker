import {HttpModule, Module} from '@nestjs/common';
import { SiteCheckerController } from './site-checker.controller';
import { SiteCheckerService } from './site-checker.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
  ],
  controllers: [SiteCheckerController],
  providers: [SiteCheckerService]
})
export class SiteCheckerModule {}
