import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styles: [
  ]
})
export class SelectDataComponent implements OnInit {
  @Input() diaInicial = 1;
  @Input() mesInicial = 0;
  @Input() anoInicial = 2020;

  @Output() diaChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() mesChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() anoChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  atualizarDia(event: any) {
    this.diaChange.emit(event.target.value);
  }

  atualizarMes(event: any) {
    this.mesChange.emit(event.target.value);
  }

  atualizarAno(event: any) {
    this.anoChange.emit(event.target.value);
  }
}
