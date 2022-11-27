
    function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';

        if (modalTimerId) {
            clearInterval(modalTimerId);
        }        
    }
   

    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('hide');
        modal.classList.remove('show');       
        document.body.style.overflow = '';
    }

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
         // modalCloseBtn = document.querySelector('[data-close]'); по то му что на динамически созданный элемент не повесить обработчик события


        modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));             
    });

    //modalCloseBtn.addEventListener('click', closeModal);
       // modal.classList.toggle('show');
    

    modal.addEventListener('click', (e) => {
        if (e.terget === modal || e.target.getAttribute('data-close') =='') {
            closeModal(modalSelector);
        };
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

   

    function showModalBuScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalBuScroll);
        }
    }   
    window.addEventListener('scroll', showModalBuScroll)
}

export default modal;
export {closeModal};
export {openModal};
