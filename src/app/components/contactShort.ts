import { Component } from '@angular/core';
@Component({
  moduleId: 'module.id',
  selector: 'app-contact-short',
  template: `
                         <div style="padding: 10px">
                                <h3 class="title">Contactez-nous</h3>
                                <p class="adr">
                                    <span class="adr-group">       
                                        <span class="street-address">iPNet Experts SA</span><br>
                                        <span class="region">TOUR IPNET, Agbalepedo, Lossossime</span><br>
                                        <span class="postal-code">05 BP 507</span><br>
                                        <span class="country-name">Lome - Togo</span> 
                                        <p></p>
                                        <p class="tel"><i class="fa fa-phone"></i>Tel: +228 22 51 77 77</p>
                                        <p class="email"><i class="fa fa-envelope"></i>Email: <a
				href="mailto:contact@ipnetinstitue.com">contact@ipnetinstitue.com</a></p>
                                    </span>
                                </p>
                        </div>                      
  `
})

export class ContactShort {

}
