//slider
$('.review__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
});
//end script

$(document).ready(function () {
    var socket = io.connect('http://localhost:8008');
    var name = 'Пётр';
    var admin = 'Admin';
    var messagesAdmin = $("#messages-admin");
    var messages = $("#messages");
    var message_txtAdmin = $("#message_text-admin");
    var message_txt = $("#message_text");
    $('.chat__body .nick').text(name);
    $('.chat__body .admin').text(admin);

    function msg(nick, message) {
        var m = '<div class="msg">' +
            '<span class="user">' + safe(nick) + ':</span> '
            + safe(message) +
            '</div>';
        messages
            .append(m)
    }

    function msgAdmin(nick, message) {
        var msg = '<div class="msg">' +
            '<span class="user">' + safe(nick) + ':</span> '
            + safe(message) +
            '</div>';
        messagesAdmin
            .append(msg)
    }


    socket.on('message', function (data) {
        msg(data.name, data.message);
        msgAdmin(data.name, data.message);
        message_txt.focus();
    });

    $("#message_btn").click(function () {
        var text = $("#message_text").val();
        if (text.length <= 0)
            return;
        message_txt.val("");
        socket.emit("message", {message: text, name: name});
    });

    $("#message_btn-admin").click(function () {
        var textAdmin = $("#message_text-admin").val();
        if (textAdmin.length <= 0)
            return;
        message_txtAdmin.val("");
        socket.emit("message", {message: textAdmin, name: admin});
    });

    function safe(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
});