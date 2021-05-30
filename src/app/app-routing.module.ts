import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/core/components/home/home.component';
import { LoginComponent } from './modules/core/components/login/login.component';
import { RegisterComponent } from './modules/core/components/register/register.component';
import { AuthGuard } from './modules/core/security/guard/auth.guard';

const menuNodeModule = () => import('./modules/administrator/menu-node-module/menu-node.module').then(m => m.MenuNodeModule);
const sistemModule = () => import('./modules/administrator/sistem-module/sistem.module').then(m => m.SistemModule);
const moduleModule = () => import('./modules/administrator/module-module/module.module').then(m => m.ModuleModule);
const tableModule= () => import('./modules/administrator/table-module/table.module').then(m => m.TableModule);
const tableItemModule=() => import('./modules/administrator//table-item-module/table-item.module').then(m => m.TableItemModule);
const securityRolModule=() => import('./modules/administrator//security-rol-module/security-rol.module').then(m => m.SecurityRolModule);
const userRolModule=() => import('./modules/administrator/user-rol-module/user-rol.module').then(m => m.UserRolModule);
const rolMenuModule=() => import('./modules/administrator/rol-menu-module/rol-menu.module').then(m => m.RolMenuModule);
const userSecurityModule=() => import('./modules/administrator/user-security-module/user-security.module').then(m => m.UserSecurityModule);
const rolMenuActionModule=() => import('./modules/administrator/rol-menu-action-module/rol-menu-action.module').then(m => m.RolMenuActionModule);
const groupCodeModule=()=> import('./modules/bussines/group-code-module/group-code.module').then(m => m.GroupCodeModule);
const fileModule=() => import('./modules/bussines/file-module/file.module').then(m => m.FileModule);

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
//{ path: '**', redirectTo: '', pathMatch: 'full' },

{ path: 'menu', loadChildren: menuNodeModule,canActivate: [AuthGuard]},
{ path: 'sistem', loadChildren: sistemModule,canActivate: [AuthGuard]},
{ path: 'module', loadChildren: moduleModule,canActivate: [AuthGuard]},
{ path: 'table', loadChildren: tableModule,canActivate: [AuthGuard]},
{ path: 'tableItem', loadChildren: tableItemModule,canActivate: [AuthGuard]},
{ path: 'rol', loadChildren: securityRolModule,canActivate: [AuthGuard]},
{ path: 'userRol', loadChildren: userRolModule,canActivate: [AuthGuard]},
{ path: 'rol-menu', loadChildren: rolMenuModule,canActivate: [AuthGuard]},
{ path: 'rol-menu-items', loadChildren: rolMenuActionModule,canActivate: [AuthGuard]},
{ path: 'userSecurity', loadChildren: userSecurityModule,canActivate: [AuthGuard]},
{ path: 'code', loadChildren: groupCodeModule,canActivate: [AuthGuard]},
{ path: 'files', loadChildren: fileModule,canActivate: [AuthGuard]}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
