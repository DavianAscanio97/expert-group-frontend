import {ChangeDetectorRef, Component} from '@angular/core';
import {AppBreadcrumbService} from '../../domain/service/app.breadcrumb.service';
import { UserService } from 'src/app/domain/service/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class UserComponent {


    userDialog: boolean;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;
    formValid: boolean = true;
    users: any[];
    user: any;
    loading: boolean = true;
    selectedUsers: any[] = [];
    submitted: boolean;
    cols = [
        { field: '_id', header: 'Id' },
        { field: 'email', header: 'Correo' },
        { field: 'names', header: 'Nombres' },
        { field: 'surnames', header: 'Apellidos' }
    ];
    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private userService: UserService,
        private messageService: MessageService,
         private breadcrumbService: AppBreadcrumbService,
         private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        this.breadcrumbService.setItems([
            { label: 'Usuarios' },
            { label: 'Listado', routerLink: ['/pages/crud'] }
        ]);
    }

    async ngOnInit() {
        await this.loadTable()
    }

    async loadTable(){
        this.loading = true;
        this.users = []
        const response = await this.userService.all().pipe().toPromise();
        this.users = response.data;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: any) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: any) {
        this.deleteUserDialog = true;
        this.selectedUsers.push(user);
        this.user = { ...user };
    }

    async confirmDeleteSelected() {
        this.deleteUsersDialog = false;

        const deleteObservables = this.selectedUsers.map(user =>
            this.userService.delete(user.id)
        );
        forkJoin(deleteObservables,).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Registro eliminado correctamente',
                    life: 3000
                });
                this.loadTable();
                this.selectedUsers = [];
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hubo un error al eliminar los registros',
                    life: 3000
                });
            }
        });
    }

    async confirmDelete() {
        this.deleteUserDialog = false;

        const deleteObservables = this.selectedUsers.map(user => this.userService.delete(user._id));

        forkJoin(deleteObservables).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuarios eliminados correctamente',
                    life: 3000
                });
                this.loadTable();
                this.selectedUsers = [];
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hubo un error al eliminar los usuarios',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    async saveUser() {
        this.submitted = true;
        this.formValid = this.validateForm();

        if (this.formValid) {
            try {
                this.user.email = this.user.email.trim();
                this.user.password = this.user.password.trim();
                this.user.names = this.user.names.trim();
                this.user.surnames = this.user.surnames.trim();
                await this.userService.create(this.user).pipe(
                    catchError((error: HttpErrorResponse) => {
                        return throwError(error);
                    })
                ).toPromise();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado con éxito', life: 3000 });
                this.userDialog = false;
                this.user = {};
                await this.loadTable();
            } catch (error) {
                if (error instanceof HttpErrorResponse) {
                    const message = error.error.message || 'Ha ocurrido un error al crear el usuario';
                    this.messageService.add({ severity: 'error', summary: 'Mensaje del sistema', detail: message, life: 3000 });
                }
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete correctamente todos los campos requeridos.', life: 3000 });
        }
    }

    validateForm(): boolean {
        return !!(this.user.names && this.user.surnames && this.user.email && this.user.password && this.validateEmail(this.user.email));
    }

    validateEmail(email: string): boolean {
        const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    }
}
