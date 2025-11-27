import { Component } from '@angular/core';
@Component({
  moduleId: 'module.id',
  selector: 'app-suscribe',
  template: `
                             
<h3 i18n="@@subscribeToOurNews">Abonnez-vous à nos nouvelles</h3>
            <p i18n="@@toHaveOurLatestNews">Abonnez-vous pour avoir les dernières nouvelles</p>

            <form class="subscribe-form">
              <div class="form-group">
                <input type="email" class="form-control"
                  placeholder="Entrez votre e-mail" />
              </div>
              <input class="btn btn-theme btn-subscribe" type="submit"
                value="Abonner">
            </form>
            
<!--

<iframe width="615" height="35" src="https://sibforms.com/serve/MUIEAEgac_eW8S_JFuawX6uUzOELUpD1r3Og9_t7PEzbNEbcg7_KWr2uHIZj805_4slgFJhgxbHsuzWs3gJdzI1iNnZ5HpWVIiLWuTJm4WW8f-fHHxIzcxHNiHhB3jpgGoh9QbI7bQtVKWaB4x6k0RF11NCw0sqIk8g2OHjc_BxO8B-AhQKtiFnkXRpLeCMFAi4i2T4iAIb3AewX" frameborder="0" scrolling="auto" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>

-->

<!-- START - We recommend to place the below code where you want the form in your website html  -->
<!-- 
<div class="sib-form" style="text-align: center;
         background-color: #444444;                                 ">
    <div id="sib-form-container" class="sib-form-container">
        <div id="error-message" class="sib-form-message-panel" style=" font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949; max-width:350px; border-width:px;">
            <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
                    <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
                    />
                </svg>
                <span class="sib-form-message-panel__inner-text">
                          Nous n&#039;avons pas pu confirmer votre inscription.
                      </span>
            </div>
        </div>
        <div></div>
        <div id="success-message" class="sib-form-message-panel" style=" font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#085229; background-color:#e7faf0; border-radius:3px; border-width:px; border-color:#13ce66; max-width:350px; border-width:px;">
            <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
                    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
                    />
                </svg>
                <span class="sib-form-message-panel__inner-text">
                          Votre inscription est confirmée.
                      </span>
            </div>
        </div>
        <div></div>
        <div id="sib-container" class="sib-container--medium sib-container--horizontal" style=" text-align:center; background-color:rgba(68,68,68,1); max-width:350px; border-width:0px; border-color:#C0CCD9; border-style:solid;">
            <form id="sib-form" method="POST" action="https://sibforms.com/serve/MUIEAKD_oKsk0-ugWhyss7Kyu_w6LyaH9K24GmA8wQTlpEFFPGR28ZiL2dXfK2AOZJIlxc8TVPkT9FJs7WozTsgXqRsro-pjPSSXWil6DAoobORcAyR3fqTziSQw1J8bvW1h1d0BaOXUHE2AdpTxXRQxSkDHuFAkBd62wPdFox6LJdNjHUtZPY-k4M20SsRrxbmbCbHgzhEYN5SB"
                  data-type="subscription">
                <div style="padding: 8px 0;">
                    <div class="sib-input sib-form-block">
                        <div class="form__entry entry_block">
                            <div class="form__label-row form__label-row--horizontal">

                                <div class="entry__field">
                                    <input class="input" maxlength="200" type="email" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="EMAIL" data-required="true" required />
                                </div>
                            </div>

                            <label class="entry__error entry__error--primary" style=" font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;">
                            </label>
                        </div>
                    </div>
                </div>
                <div style="padding: 8px 0;">
                    <div class="sib-form-block" style="text-align: right">
                        <button class="sib-form-block__button" style=" font-size:14px; text-align:right; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#FFFFFF; background-color:#4678a1; border-width:0px;" form="sib-form" type="submit">
                            S&#039;INSCRIRE
                        </button>
                        <div class="sib-loader" style="display: none;">
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                            <div style="background: #4678a1;"></div>
                        </div>
                    </div>
                </div>

                <input type="text" name="email_address_check" value="" class="input--hidden">
                <input type="hidden" name="locale" value="fr">
            </form>
        </div>
    </div>
</div>
-->
<!-- END - We recommend to place the below code where you want the form in your website html  -->
  `
})

export class Suscribe {

}
