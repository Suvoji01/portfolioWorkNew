import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactForm!: FormGroup;
  submitted: boolean = false;
  currentYear: number = new Date().getFullYear();
  showScrollTop: boolean = false;
  isMenuOpen = false;
  isLoading: boolean = true;
  isSubmitting: boolean = false;


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  clickSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        console.log(this.contactForm.value);
        this.isSubmitting = false;
        this.contactForm.reset();
      }, 1000);
    }
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.showScrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 20;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.querySelector('header ul');
    if (menu) {
      menu.classList.toggle('show', this.isMenuOpen);
    }
  }
}
