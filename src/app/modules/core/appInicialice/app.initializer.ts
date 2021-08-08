import { AccountService } from "../security/service/account.service";

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        accountService.excuteInitalServices()
            .subscribe(result => { },
                (error => {
                    accountService.logout();
                })
            )
            .add(resolve);
    });
}