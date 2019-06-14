$(document).ready(function () {
    //slider
    $('.review__slider').slick({
        dots: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });
//end script

    //chat script
    let socket = io.connect('http://localhost:8008');
    let name = 'User';
    let admin = 'Admin';
    let messagesAdmin = $("#messages-admin");
    let messages = $("#messages");
    let message_txtAdmin = $("#message_text-admin");
    let message_txt = $("#message_text");

    function msg(nick, message) {
        let msgUser = '<div class="msg">' +
            '<span class="user">' + safe(nick) + ':</span> '
            + '<span class="msg-text">' + safe(message) + '</span>' + '</div>';
        messages
            .append(msgUser)
    }

    function msgAdmin(nick, message) {
       let msg = '<div class="msg">' +
            '<span class="user">' + safe(nick) + ':</span> '
            + '<span class="msg-text">' + safe(message) + '</span>' + '</div>';

        messagesAdmin
            .append(msg)
    }


    socket.on('message', function (data) {
        msg(data.name, data.message);
        msgAdmin(data.name, data.message);
        message_txt.focus();
    });

    $("#message_btn").click(function () {
        let text = $("#message_text").val();
        if (text.length <= 0)
            return;
        message_txt.val("");
        socket.emit("message", {message: text, name: name});
    });

    $("#message_btn-admin").click(function () {
        let textAdmin = $("#message_text-admin").val();
        if (textAdmin.length <= 0)
            return;
        message_txtAdmin.val("");
        socket.emit("message", {message: textAdmin, name: admin});
    });

    function safe(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    //end script
});
