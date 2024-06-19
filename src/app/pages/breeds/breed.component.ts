import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../../domain/service/app.breadcrumb.service';
import { BreedService } from 'src/app/domain/service/breed.service';

@Component({
    templateUrl: './breed.component.html'
})
export class BreedComponent {

    constructor(private breadcrumbService: AppBreadcrumbService, private readonly _breedService: BreedService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard' },
            { label: 'Gatos', routerLink: ['/'] }
        ]);
    }

    loading = false
    loadingGallery = false
    loadingDetail = false
    selectedState: any = 'asho';
    images: any[] = [];
    show = false
    breedSelected = null

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    breeds = []

    async ngOnInit() {
        this.loading = true
        this.loadBreeds()
        this.loadImagesBreeds()
        this.loading = false
    }

    loadBreeds(){
        this.loading = true
        this._breedService.breedsAll().subscribe(
            (response) => {
                this.breeds = response.data
                this.loading = false
            },
            (error) => {
                this.loading = false
            }
        )
    }

    loadImagesBreeds(){
        this.loadingGallery = true
        this._breedService.breedImages(this.selectedState).subscribe(
            (response) => {
                this.images = response.data
                this.loadingGallery = false
            },
            (error) => {
                console.log(error)
                this.loadingGallery = false
            }
        )
    }

    loadBreedById(id: string) {
        this.show = true
        this.loadingDetail = true
        this._breedService.breedsById(id).subscribe(
            (response) => {
                this.breedSelected = response.data
                this.loadingDetail = false
            },
            (error) => {
                this.loadingDetail = false
            }
        )
    }
}
