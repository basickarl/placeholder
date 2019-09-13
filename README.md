# placeholder-polyfill

A placeholder polyfill that fills in placeholder values for input types on Internet Explorer version 8 and 9. Just include the `placeholder.js` file script in your build somehow and call  `placeholderPolyfill()` when the window has loaded.

Example:
```
<!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
            .placeholder {
                color: red;
            }
            .my-custom-placeholder {
                color: green;
            }
        </style>
    </head>
    <body>
        <input type="text" placeholder="placeholder text"><br>
        <input type="text" placeholder="my custom placeholder text" placeholderclassname="my-custom-placeholder"><br>
        <script>
            window.onload = function() {
                placeholderPolyfill();
            }
        </script>
    </body>
</html>

```