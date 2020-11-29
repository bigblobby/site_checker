import {IsNotEmpty, IsUrl} from "class-validator";

export default class CheckSiteDto {
    @IsUrl({}, {message: 'Please provide a valid URL.'})
    @IsNotEmpty({message: 'This should not be empty.'})
    url: string;
}
