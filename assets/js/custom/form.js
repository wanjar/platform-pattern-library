// "Adapt" fields
$('.form-field-adapt').each(function(){
    var field = $(this),
        control = $(this).find('input, textarea');

    // Initialize and check status for the field on page load
    field.addClass('init');
    statusUpdate();

    // Update the field's status when it's put into or out of focus
    control.on('focus blur', function(){
        statusUpdate();
    });

    function statusUpdate() {
        if (control.is(':focus')) {
            field.addClass('focus');
        } else if (control.val()) {
            field.addClass('value').removeClass('focus');
        } else {
            field.removeClass('focus value');
        }
    }

    // Automatically adjust the height of the textarea based on user's input
    autosize($(this).find('textarea'));
});

// Toggle visibility of fields in long fieldsets and forms
$('.form-field-toggle').each(function(){
	var fieldgroup = $(this).closest('fieldset, .form-fieldgroup'),
		fieldCount = fieldgroup.find('.form-field').length;

		if (fieldCount > 2) {
			fieldgroup.find('.form-field:eq(1)').nextAll('.form-field').addClass('overflow');
            fieldgroup.addClass('has-overflow');

            $(this).on('click', function(){
                fieldgroup.toggleClass('show-overflow');
            });
		}
});

// Initialize radio and checkbox inputs for 'checked' class
function checkedStatus(checkedButton) {
    var formField = checkedButton.closest('.form-field');

    if (checkedButton.is(':checked')) {
        formField.addClass('checked');
    } else {
        formField.removeClass('checked');
    }

    if (checkedButton[0].hasAttribute('data-fieldgroup-toggle')) {
        var target = $('[data-fieldgroup-target="'+checkedButton.attr('data-fieldgroup-toggle')+'"]');

        // Add 'init' class to target and trigger
        checkedButton.addClass('init');
        target.addClass('init');

        if (checkedButton.is(':checked')) {
            target.addClass('active');
        } else {
            target.removeClass('active');
        }
    }
}

$('input[type="radio"], input[type="checkbox"]').each(function(){
    checkedStatus($(this));
});

$('input[type="radio"], input[type="checkbox"]').on('change', function(){
    checkedStatus($(this));

    if ($(this).is('[type="radio"]')) {
        $('input[type="radio"][name="'+$(this).attr('name')+'"]').each(function(){
            checkedStatus($(this));
        });
    }
});

// Initialize date fields with 'PickaDate.js'
$('input[type="date"]').pickadate({
    format: 'mmmm d, yyyy',
    today: 'Choose today'
});

// Initialize time fields with 'PickaDate.js'
$('input[type="time"]').pickatime({
    format: 'h:i A',
    klass: {
        buttonClear: 'picker__button--clear button'
    }
});

// Display search suggestions in dropdown when search input is in focus and has a value
$('.searchbar-input').each(function(){
    var input = $(this).find('input[type="search"]'),
        dropdownMenu = $(this).find('.dropdown-menu'),
        ghost = $(this).find('.input-ghost');

    input.on('keyup', function(){
        if (input.val()) {
            dropdownMenu.addClass('active');
            ghost.html(input.val());
        }
    });

    input.on('focusout', function(){
        dropdownMenu.removeClass('active');
    });
});
