'use strict';

window.onload = function () {

    var ie = document.createElement('div');
    ie.innerHTML = '<!--[if IE]><i></i><![endif]-->';
    var isIe = (ie.getElementsByTagName('i').length == 1);
    if (isIe) {
        ie.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
        isIe = (ie.getElementsByTagName('i').length == 1);
        if (isIe) {
            isIe = 9;
        } else {
            alert('Sorry to inform but this website does not work with versions of Internet Explorer 8 and below. Upgrade or change browser!');
            isIe = 8; // ie8 and below
        }
    } else {
        isIe = false;
    }

    if (isIe == 8 || isIe == 9) { // else ie10+
        function add_placeholder(id) {
            var el = document.getElementById(id);
            var placeholder = document.getElementById(id).getAttribute('placeholder');
            el.placeholder = placeholder;

            el.value = placeholder; // set initial placeholder text
            el.defaultClassName = el.className; // save default class
            el.className = el.defaultClassName + ' placeholder'; // set initial placeholder style
            el.ifPlaceholder = true;

            el.onfocus = function () {
                if (this.value == this.placeholder && this.ifPlaceholder == true) {
                    this.ifPlaceholder = false;
                    this.value = '';
                    el.className = el.defaultClassName;
                }
            };
            el.onblur = function () {
                if (this.value.length == 0) {
                    this.ifPlaceholder = true;
                    this.value = this.placeholder;
                    el.className = el.defaultClassName + ' placeholder';
                }
            };
            el.onblur();
        }

        var list = document.getElementsByTagName('input');
        for (i = 0; i < list.length; i++) {
            var type = list[i].getAttribute('type');
            if (type != 'undefined' && type != null) { // make all inputs have type
                if (type == 'text' || type == 'password') {
                    console.log('adding add_placeholder to ' + list[i].getAttribute('id'));
                    add_placeholder(list[i].getAttribute('id'));
                }
            } else {
                console.log('Oh dearie me, an input without a type specified, tsk tsk. Fix.');
            }
        }
        var list = document.getElementsByTagName('textarea');
        for (i = 0; i < list.length; i++) {
            add_placeholder(list[i].getAttribute('id'));
        }
    }
}
