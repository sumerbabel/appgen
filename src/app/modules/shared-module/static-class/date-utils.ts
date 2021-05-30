export class DateUtils{
    public static dateNowString():string{
       return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    
}