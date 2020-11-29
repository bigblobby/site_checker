import {Injectable, HttpService, BadRequestException} from '@nestjs/common';

enum SiteStatus {
    DOWN,
    UP
}

@Injectable()
export class SiteCheckerService {
    constructor(
        private httpService: HttpService
    ) {}

    private addHttp(url){
        return `http://${url}`;
    }

    private checkForHttp(url){
        const re = new RegExp("^(http|https)://", "i");
        const match = re.test(url);

        if(!match) return this.addHttp(url);
        return url;
    }

    public checkUrl(url) {
        if(!url) throw new BadRequestException();

        const newUrl = this.checkForHttp(url);

        return new Promise((resolve) => {
            this.httpService.get(newUrl)
                .subscribe(response => {
                    resolve({
                        siteStatus: SiteStatus.UP,
                        status: response.status,
                        statusText: response.statusText,
                        config: response.config,
                        url: response.config.url
                    });
                }, error => {
                    resolve({
                        siteStatus: SiteStatus.DOWN,
                        status: error.response.status,
                        statusText: error.response.statusText,
                        config: error.response.config,
                        url: error.response.config.url
                    })
                });
        });
    }
}
