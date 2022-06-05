document.addEventListener('DOMContentLoaded',()=>{
    let modal = document.querySelector('.modal'),
        modalBtnClose = document.querySelector('.modal__btn-close'),
        flag = true;
    document.addEventListener('mouseout',(event)=>{
        if (event.clientY<3 && flag){
            modal.style.display = 'flex';
            flag = false;
        }
    })
    modalBtnClose.addEventListener('click',()=>{
        modal.style.display ='none';
    })
    
})

$('#sendForm').on('click',()=>{
    let userName = $("[name='userName']").val(),
        userPhone = $("[name='userPhone']").val(),
        userMail = $("[name='userMail']").val();
        symbols = ["<", ">","=", "(", ")", ";", "/", "%"];
    $('.modal__message-form').css('background-color', '#E50000');
    if (userName.length<2 || userPhone.length<6 || userMail.length<5){
        $('.modal__message-form').text('Некорректные данные. Ошибка отправки.');
        return false;
    }
    $('.modal__message-form').text('');

    $.ajax({
        url: 'static/scripts/formProcessor.php',
        type: 'POST',
        cache: false,
        data: {
            'name':userName,
            'phone':userPhone,
            'mail':userMail
        },
        dataType: 'html',
        beforeSend: ()=>{
            $('#sendForm').prop('disabled', true);
        },
        success: (data)=>{
            flag = false;
            data = JSON.parse(data);
            if (data['phone']=='invalid' || data['mail']=='invalid'){
                $('.modal__message-form').text('Некорректные данные. Ошибка отправки.');
            }else{
                $('.modal__message-form').css('background-color', '#5EFF8B');
                $('.modal__message-form').text('Успешно');
                setTimeout(()=>{
                    $('.modal').css('display','none');
                }, 2000);
            }
            $('#sendForm').prop('disabled', false);
            $("[name='userForm']").trigger('reset');
        }

    })


})


"<", ">","=", "(", ")", ";", "/", "%"