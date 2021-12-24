import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.scss"],
})
export class SuccessComponent implements OnInit {
  @Input() back: string;
  @Input() create: string;
  
  constructor(private router: Router,) {}

  ngOnInit(): void {}

  handleBack() {
    this.router.navigate([this.back]);
  }

  handleCreate() {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => this.router.navigate([this.create]));
  }
}
