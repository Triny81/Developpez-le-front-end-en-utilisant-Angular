import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;

  protected yearsJO: number[] = [];
  protected pieDatas: Array<{ 
    name: string; 
    value: number; 
    extra: { id: number; }; 
  }> = [];  // tableau pour afficher les résultats sur le diagramme

  protected view!: [number, number];
  private heightGraph: number = 400;

  // options
  protected gradient: boolean = false;
  protected showLegend: boolean = false;
  protected showLabels: boolean = true;
  protected isDoughnut: boolean = false;
  protected legendPosition: LegendPosition = LegendPosition.Below;

  constructor(private olympicService: OlympicService, private router: Router) {
    this.view = [innerWidth, this.heightGraph];
    Object.assign(this, this.pieDatas);
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(olympics => {

      if (olympics) {

        for (let i = 0; i < olympics.length; i++) {
          const olympic = olympics[i]; 

          let pieElement = {
            "name": olympic["country"],
            "value": 0,
            "extra": { "id": olympic["id"] } // tableau "extra" pour pouvoir ajouter des données supplémentaires autre que name et value
          };

          for (let j = 0; j < olympic["participations"].length; j++) {
            const participation = olympic["participations"][j];

            // recherche des années des JO
            const year = participation["year"];
            if (!this.yearsJO.includes(year)) {
              this.yearsJO.push(participation["year"]);
            }

            pieElement["value"] += participation["medalsCount"]; // médailles par pays
          }

          this.pieDatas.push(pieElement);
        }
  
        this.pieDatas = [...this.pieDatas]; // afficher les pays dans le graphique
      }
    });
  }

  onSelect(olympicId: number): void { // rediriger l'utilisateur vers le détail du pays quand il clique sur un pays du diagramme
    this.router.navigate(['/', 'detail', olympicId]);
  }

  onResize(event: Event): void { // rendimensionnement du graphique pour la responsivité
    let window = event.target as Window;
    if (window) {
      this.view = [window.outerWidth, this.heightGraph];
    }
  }
}
