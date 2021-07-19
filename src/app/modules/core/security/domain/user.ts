export class User {
    username: string | undefined;
    token: string | undefined;
    isExpiredToken?:boolean =false;
    expiredTokenMinutes?:any;

}
