import {closeModal, openModal} from './modal';
import { postData } from "../services/services";

function form(formSelector) {
    const form = document.querySelector(formSelector),    
          message = {
             loading: 'img/form/spinner.svg',
             success: 'Заявка отправлена',
             failure: 'Не получилось отправить заявку. Повторите позднее.'
          }
    

    let name = document.querySelector('#name');
    name.addEventListener('keydown', function(e){
        if( e.key.match(/[0-9]/) ) return e.preventDefault();
    }); 
      
    name.addEventListener('input', function(e){
        name.value = name.value.replace(/[0-9]/g, "");
    });

    form.reset();
    bindPostData(form);

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage= document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; 
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('mailer/smart.php', json)
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch((e) => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div> 
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 2000);
    }

        
    let phone = document.querySelector('#phone'); 
        
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        const pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        
        var matrix = "+7 (___) ___ ____",
            i = 0,
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) : a
            });

        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }

        var reg = matrix.slice(0, this.value.length)
                        .replace(/_+/g, function(a) {
                            return "\\d{1," + a.length + "}"
                        })
                        .replace(/[+()]/g, "\\$&");

        reg = new RegExp("^" + reg + "$");
        
        if (!reg.test(this.value) || this.value.length < 5 
            || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
        }

        if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
        }
    }

    phone.addEventListener("input", mask, false);
    phone.addEventListener("focus", mask, false);
    phone.addEventListener("blur", mask, false);
    phone.addEventListener("keydown", mask, false);

}

export default form;