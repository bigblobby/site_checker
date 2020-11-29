import { Controller, Post, Body } from '@nestjs/common';
import {SiteCheckerService} from "./site-checker.service";
import CheckSiteDto from "./dto/CheckSiteDto";

@Controller('site-checker')
export class SiteCheckerController {
    constructor(
        private readonly siteCheckerService: SiteCheckerService
    ){}

    @Post()
    checkSite(@Body() data: CheckSiteDto){
        return this.siteCheckerService.checkUrl(data.url);
    }
}
