import { Component} from "@angular/core";

@Component({
  selector: 'app-footer',
  styleUrls: ['footer.component.scss'],
  template: `
      <footer class="d-flex">

          <div class="contactus-container d-flex justify-content-between align-items-center ml-4">
              <a>Contact Us</a>
              <a>Blog</a>
              <a>Shop</a>
          </div>

          <div class="logo-container d-flex justify-content-center">
              <img src="../../../../../assets/img/main-logo.png">
          </div>

          <div class="copyright-container d-flex justify-content-end align-items-end mr-4">
              <p>&copy; 2022TestCopyRight</p>
          </div>
      </footer>
  `
})
export class FooterComponent {}
