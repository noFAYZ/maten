
(function () {
    "use strict";

    var MANET_OPTIONS = [
        'url', 'agent', 'delay', 'format',
        'width', 'height', 'paperFormat', 'paperOrientation', 'zoom', 'quality',
        'js', 'images',
        'user', 'password',
        'callback', 'headers', 'clipRect',
        'force', 'selector','selectorCrop','selectorCropPadding',
        'engine'
    ];

    function cleanBoolValue(name, value) {
        return ((value && (name === 'js' || name === 'images')) ||
                (!value && (name === 'force' || name === 'selectorCrop'))) ? null : value;
    }

    function readOptions() {
        var options = {};
        MANET_OPTIONS.forEach(function(opt) {
            var element = $('#' + opt),
                value = element.val();

            if (typeof(value) !== 'undefined') {
                if (element.attr('type') === 'checkbox') {
                    value = cleanBoolValue(opt, element.attr('checked'));
                }

                if (value !== null && value !== '') {
                    options[opt] = value;
                }
            }
        });
        return options;
    }

    function generateUrl() {
        return '?' + $.param(readOptions());
    }

    function updateAddress() {
        $('#address').val(generateUrl());
    }

    $(document).ready(function () {
        MANET_OPTIONS.forEach(function(opt) {
            var element = $('#' + opt);

            element.keyup(updateAddress);
            element.change(updateAddress);
            if (element.attr('type') === 'select') {
                element.select(updateAddress);
            }
        });
        
        
        
        
        
        

        $('#open').click(function(event) {
         
            
            $(document).ready(function() {
    $('.story-small img').each(function() {
        var maxWidth = 225; // Max width for the image
        var maxHeight = 150;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var width = $(this).width();    // Current image width
        var height = $(this).height();  // Current image height

        // Check if the current width is larger than the max
        if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            $(this).css("width", maxWidth); // Set new width
            $(this).css("height", height * ratio);  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if(height > maxHeight){
            ratio = maxHeight / height; // get ratio for scaling image
            $(this).css("height", maxHeight);   // Set new height
            $(this).css("width", width * ratio);    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
        }
    });
});
            
              document.getElementById("loading").innerHTML = "<img class='story-small' src='generateUrl();'>";
            
            event.preventDefault();
        });

        var rememberHeight = false;
        $('#selectorCrop').change(function(){
            if ($(this).is(':checked')) {
                rememberHeight = $('#height').val();
                $('#height').val('');
            } else if(rememberHeight){
                $('#height').val(rememberHeight);
            }
            updateAddress();
        });

        updateAddress();
    });

})();
