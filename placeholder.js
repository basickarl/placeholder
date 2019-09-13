'use strict';

function placeholderPolyfill() {
    var ie = document.createElement('div');
    ie.innerHTML = '<!--[if IE]><i></i><![endif]-->';
    var isIe = (ie.getElementsByTagName('i').length == 1);
    if (isIe) {
        ie.innerHTML = '<!--[if lte IE 7]><i></i><![endif]-->';
        isIe = (ie.getElementsByTagName('i').length == 1);
        if (isIe) { // IE 7 or less
            isIe = 7;
            console.error('Sorry to inform but this placeholder polyfill does not work with versions of Internet Explorer 7 and below. Upgrade or change browser!');
        } else {
            ie.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
            isIe = (ie.getElementsByTagName('i').length == 1);
            if (isIe) { // IE 8 or 9
                isIe = 8; 
            } else { // IE 10 or greater
                isIE = 10
            }
        }
    }

    if (isIe == 8) { // Only support IE 8 or 9
        function add_placeholder(el) {
            var placeholder = el.getAttribute('placeholder');
            if (placeholder == null) { // No placeholder attribute exists on input element
                return;
            }
            el.placeholder = placeholder; // Storage of the placeholder text
            el.value = placeholder; // Set initial placeholder text
            var placeholderClassname = el.getAttribute('placeholderclassname');
            el.defaultClassName = el.className; // Save default class
            if (placeholderClassname != null) {
                el.className = el.defaultClassName + ' ' + placeholderClassname; // Add custom style class
            } else {
                el.className = el.defaultClassName + ' placeholder'; // Add default style class
            }
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
                    if (placeholderClassname != null) {
                        el.className = el.defaultClassName + ' ' + placeholderClassname; // Add custom style class
                    } else {
                        el.className = el.defaultClassName + ' placeholder'; // Add default style class
                    }
                }
            };
            el.onblur(); // Set initial style
        }

        // Fix for input text and password
        var list = document.getElementsByTagName('input');
        for (var i = 0; i < list.length; i++) {
            var type = list[i].getAttribute('type');
            if (type != 'undefined' && type != null) { // Make all inputs have type
                if (type == 'text' || type == 'password') {
                    console.log('Adding placeholder to:', list[i]);
                    addPlaceholder(list[i]);
                }
            } else {
                console.log('Oh dearie me, an input without a type specified, tsk tsk. Fix.');
            }
        }
        // Fix for textarea
        var list = document.getElementsByTagName('textarea');
        for (var i = 0; i < list.length; i++) {
            addPlaceholder(list[i]);
        }
    }
}
